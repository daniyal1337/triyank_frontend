import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Product, formatPrice, PRODUCT_CATEGORIES } from "@/data/products";
import ProductFormDialog from "./ProductFormDialog";
import { useToast } from "@/hooks/use-toast";

interface ProductsTableProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const statusBadge: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  draft: "bg-amber-100 text-amber-700",
  archived: "bg-secondary text-muted-foreground",
};

const ProductsTable = ({ products, setProducts }: ProductsTableProps) => {
  const [search, setSearch] = useState("");
  const [filterCollection, setFilterCollection] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCollection = filterCollection === "all" || p.collection === filterCollection;
    const matchCategory = filterCategory === "all" || p.category === filterCategory;
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchCollection && matchCategory && matchStatus;
  });

  const handleSave = (product: Product) => {
    if (editProduct) {
      setProducts(prev => prev.map(p => p.id === product.id ? product : p));
      toast({ title: "Product updated", description: `${product.name} has been updated.` });
    } else {
      setProducts(prev => [...prev, product]);
      toast({ title: "Product added", description: `${product.name} has been added.` });
    }
    setEditProduct(null);
  };

  const handleDelete = (id: string, name: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({ title: "Product deleted", description: `${name} has been removed.` });
  };

  const openEdit = (product: Product) => {
    setEditProduct(product);
    setFormOpen(true);
  };

  const openAdd = () => {
    setEditProduct(null);
    setFormOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or SKU..."
              className="pl-9"
            />
          </div>
          <Select value={filterCollection} onValueChange={setFilterCollection}>
            <SelectTrigger className="w-32"><SelectValue placeholder="Collection" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Collections</SelectItem>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="western">Western</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-36"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {PRODUCT_CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-28"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAdd} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead className="w-12">#</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Collection</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Badges</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((product, idx) => (
              <TableRow key={product.id} className="group">
                <TableCell className="text-xs text-muted-foreground">{idx + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover border border-border bg-secondary" />
                    <div>
                      <p className="text-sm font-medium leading-tight">{product.name}</p>
                      {product.material && <p className="text-xs text-muted-foreground">{product.material}</p>}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-mono text-muted-foreground">{product.sku}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize text-xs">{product.collection}</Badge>
                </TableCell>
                <TableCell className="text-sm">{product.category}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <p className="text-sm font-medium">{formatPrice(product.price)}</p>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <p className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className={`text-sm font-medium ${product.stock <= (product.lowStockThreshold || 5) ? "text-red-600" : "text-foreground"}`}>
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge[product.status]}`}>
                    {product.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {product.isNew && <Badge className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5">New</Badge>}
                    {product.isBestseller && <Badge className="bg-amber-100 text-amber-700 text-[10px] px-1.5">Best</Badge>}
                    {product.isFeatured && <Badge className="bg-blue-100 text-blue-700 text-[10px] px-1.5">Featured</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(product)}>
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete "{product.name}"?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone. The product will be permanently removed.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(product.id, product.name)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-12 text-muted-foreground">
                  No products found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ProductFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editProduct}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProductsTable;
