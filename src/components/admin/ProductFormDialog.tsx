import { useState, useEffect, useRef } from "react";
import { X, Plus, Upload, Link, ImagePlus, Trash2, GripVertical, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Product,
  CollectionType,
  ProductStatus,
  PRODUCT_CATEGORIES,
  PRODUCT_MATERIALS,
  PRODUCT_OCCASIONS,
} from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSave: (product: Product) => void;
}

const emptyProduct: Omit<Product, "id" | "createdAt" | "updatedAt"> = {
  name: "",
  sku: "",
  price: 0,
  originalPrice: undefined,
  costPrice: undefined,
  image: "/placeholder.svg",
  images: [],
  category: "",
  collection: "western",
  description: "",
  shortDescription: "",
  material: "",
  occasion: "",
  weight: "",
  dimensions: "",
  stock: 0,
  lowStockThreshold: 5,
  status: "draft",
  isNew: false,
  isBestseller: false,
  isFeatured: false,
  tags: [],
};

const ProductFormDialog = ({ open, onOpenChange, product, onSave }: ProductFormDialogProps) => {
  const [form, setForm] = useState<Partial<Product>>(emptyProduct);
  const [tagInput, setTagInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [activeImageTab, setActiveImageTab] = useState<"url" | "upload">("url");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (product) {
      setForm({ ...product });
    } else {
      setForm({ ...emptyProduct });
    }
    setTagInput("");
    setUrlInput("");
  }, [product, open]);

  const update = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  const allImages: string[] = (() => {
    const imgs: string[] = [];
    if (form.image && form.image !== "/placeholder.svg") imgs.push(form.image);
    (form.images || []).forEach(img => { if (img && !imgs.includes(img)) imgs.push(img); });
    return imgs;
  })();

  const addImageUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    if (allImages.includes(url)) {
      toast({ title: "Image already added", variant: "destructive" });
      return;
    }
    const newImages = [...allImages, url];
    update("image", newImages[0]);
    update("images", newImages.slice(1));
    setUrlInput("");
    toast({ title: "Image added" });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        if (!dataUrl) return;
        const newImages = [...allImages, dataUrl];
        update("image", newImages[0]);
        update("images", newImages.slice(1));
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast({ title: `${files.length} image${files.length > 1 ? "s" : ""} uploaded` });
  };

  const removeImage = (index: number) => {
    const newImages = allImages.filter((_, i) => i !== index);
    update("image", newImages[0] || "/placeholder.svg");
    update("images", newImages.slice(1));
  };

  const setAsPrimary = (index: number) => {
    if (index === 0) return;
    const reordered = [allImages[index], ...allImages.filter((_, i) => i !== index)];
    update("image", reordered[0]);
    update("images", reordered.slice(1));
    toast({ title: "Primary image set" });
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags?.includes(tagInput.trim())) {
      update("tags", [...(form.tags || []), tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    update("tags", (form.tags || []).filter(t => t !== tag));
  };

  const handleSave = () => {
    if (!form.name?.trim()) {
      toast({ title: "Product name is required", variant: "destructive" });
      return;
    }
    if (!form.sku?.trim()) {
      toast({ title: "SKU is required", variant: "destructive" });
      return;
    }
    const now = new Date().toISOString().split("T")[0];
    const saved: Product = {
      id: product?.id || `p${Date.now()}`,
      name: form.name || "",
      sku: form.sku || "",
      price: form.price || 0,
      originalPrice: form.originalPrice,
      costPrice: form.costPrice,
      image: form.image || "/placeholder.svg",
      images: form.images || [],
      category: form.category || "Uncategorized",
      collection: (form.collection as CollectionType) || "western",
      description: form.description || "",
      shortDescription: form.shortDescription,
      material: form.material,
      occasion: form.occasion,
      weight: form.weight,
      dimensions: form.dimensions,
      stock: form.stock || 0,
      lowStockThreshold: form.lowStockThreshold || 5,
      status: (form.status as ProductStatus) || "draft",
      isNew: form.isNew,
      isBestseller: form.isBestseller,
      isFeatured: form.isFeatured,
      tags: form.tags,
      createdAt: product?.createdAt || now,
      updatedAt: now,
    };
    onSave(saved);
    onOpenChange(false);
  };

  const isEdit = !!product;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">{isEdit ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ── Left Column ── */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Basic Info</h3>

            <div className="space-y-1.5">
              <Label className="text-xs">Product Name *</Label>
              <Input value={form.name} onChange={e => update("name", e.target.value)} placeholder="e.g. Aria Chain Necklace" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">SKU *</Label>
                <Input value={form.sku} onChange={e => update("sku", e.target.value)} placeholder="TRY-W-NCK-001" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Status</Label>
                <Select value={form.status} onValueChange={v => update("status", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Short Description</Label>
              <Input value={form.shortDescription} onChange={e => update("shortDescription", e.target.value)} placeholder="Brief one-liner" />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Full Description</Label>
              <Textarea value={form.description} onChange={e => update("description", e.target.value)} rows={4} placeholder="Detailed product description..." />
            </div>

            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pt-1">Pricing & Inventory</h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Selling Price (₹) *</Label>
                <Input type="number" value={form.price || ""} onChange={e => update("price", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Original / MRP (₹)</Label>
                <Input type="number" value={form.originalPrice || ""} onChange={e => update("originalPrice", Number(e.target.value) || undefined)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Cost Price (₹)</Label>
                <Input type="number" value={form.costPrice || ""} onChange={e => update("costPrice", Number(e.target.value) || undefined)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Stock Quantity</Label>
                <Input type="number" value={form.stock || ""} onChange={e => update("stock", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Low Stock Alert</Label>
                <Input type="number" value={form.lowStockThreshold || ""} onChange={e => update("lowStockThreshold", Number(e.target.value))} />
              </div>
            </div>

            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pt-1">Tags & Badges</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <Switch checked={!!form.isNew} onCheckedChange={v => update("isNew", v)} />
                New Arrival
              </label>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <Switch checked={!!form.isBestseller} onCheckedChange={v => update("isBestseller", v)} />
                Bestseller
              </label>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <Switch checked={!!form.isFeatured} onCheckedChange={v => update("isFeatured", v)} />
                Featured
              </label>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Add tag and press Enter..."
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="sm" onClick={addTag}>Add</Button>
              </div>
              {form.tags && form.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {form.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-destructive"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="space-y-4">
            {/* Product Images */}
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product Images</h3>

            <Tabs value={activeImageTab} onValueChange={v => setActiveImageTab(v as "url" | "upload")}>
              <TabsList className="h-8 text-xs">
                <TabsTrigger value="url" className="text-xs gap-1.5"><Link className="w-3 h-3" />Image URL</TabsTrigger>
                <TabsTrigger value="upload" className="text-xs gap-1.5"><Upload className="w-3 h-3" />Upload File</TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="mt-2">
                <div className="flex gap-2">
                  <Input
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addImageUrl())}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 text-xs"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addImageUrl} className="gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">Paste an image URL and click Add. You can add multiple images.</p>
              </TabsContent>

              <TabsContent value="upload" className="mt-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-secondary/30 transition-colors cursor-pointer"
                >
                  <ImagePlus className="w-8 h-8 text-muted-foreground" />
                  <p className="text-xs font-medium">Click to upload photos</p>
                  <p className="text-[11px] text-muted-foreground">PNG, JPG, WEBP up to 10MB each. Multiple files supported.</p>
                </button>
              </TabsContent>
            </Tabs>

            {/* Image Gallery */}
            {allImages.length > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">{allImages.length} image{allImages.length > 1 ? "s" : ""} · first is primary</Label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {allImages.map((img, idx) => (
                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-border aspect-square bg-secondary">
                      <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-current" /> Primary
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => setAsPrimary(idx)}
                            className="bg-white/20 hover:bg-white/40 text-white rounded-full p-1.5 transition-colors"
                            title="Set as primary"
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1.5 transition-colors"
                          title="Remove image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* Add more placeholder */}
                  <button
                    type="button"
                    onClick={() => setActiveImageTab("url")}
                    className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1 hover:border-primary/50 hover:bg-secondary/20 transition-colors text-muted-foreground"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-[10px]">Add more</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-border rounded-lg p-4 text-center text-xs text-muted-foreground">
                No images added yet. Use URL or upload above.
              </div>
            )}

            {/* Categories */}
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pt-1">Categories</h3>

            <div className="space-y-1.5">
              <Label className="text-xs">Collection Type *</Label>
              <Select value={form.collection} onValueChange={v => update("collection", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="indian">🪔 Indian / Traditional</SelectItem>
                  <SelectItem value="western">✨ Western / Contemporary</SelectItem>
                  <SelectItem value="leather">🧶 Leather Collection</SelectItem>
                  <SelectItem value="both">🌟 Both (Indian & Western)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Jewelry Category *</Label>
              <Select value={form.category} onValueChange={v => update("category", v)}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Material</Label>
                <Select value={form.material || ""} onValueChange={v => update("material", v)}>
                  <SelectTrigger><SelectValue placeholder="Select material" /></SelectTrigger>
                  <SelectContent>
                    {PRODUCT_MATERIALS.map(mat => (
                      <SelectItem key={mat} value={mat}>{mat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Occasion</Label>
                <Select value={form.occasion || ""} onValueChange={v => update("occasion", v)}>
                  <SelectTrigger><SelectValue placeholder="Select occasion" /></SelectTrigger>
                  <SelectContent>
                    {PRODUCT_OCCASIONS.map(occ => (
                      <SelectItem key={occ} value={occ}>{occ}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Weight</Label>
                <Input value={form.weight} onChange={e => update("weight", e.target.value)} placeholder="e.g. 15g" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Dimensions</Label>
                <Input value={form.dimensions} onChange={e => update("dimensions", e.target.value)} placeholder="e.g. 5cm × 3cm" />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4 border-t border-border mt-2">
          <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
          <Button onClick={handleSave}>{isEdit ? "Save Changes" : "Add Product"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
