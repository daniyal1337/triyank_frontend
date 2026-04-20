import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
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
import { Product, formatPrice, PRODUCT_CATEGORIES, CollectionType } from "@/data/products";
import ProductFormDialog from "./ProductFormDialog";
import { useToast } from "@/hooks/use-toast";

interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  description: string;
  main_image: string;
  collection_type: string;
  material: string;
  occasion: string;
  weight: string;
  stock: number;
  is_featured: number;
  created_at: string;
  updated_at: string;
  category: string;
}



const ProductsTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterCollection, setFilterCollection] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const loadProducts = async () => {
    try {
      setError(null);
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/products`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const apiProducts: ApiProduct[] = await response.json();
      const transformedProducts: Product[] = apiProducts.map((apiProduct) => ({
        id: String(apiProduct.id),
        name: apiProduct.name,
        sku: apiProduct.slug.toUpperCase().replace(/-/g, "_"),
        price: Number(apiProduct.price),
        image: apiProduct.main_image,
        category: apiProduct.category,
        collection: apiProduct.collection_type as CollectionType,
        description: apiProduct.description,
        material: apiProduct.material,
        occasion: apiProduct.occasion,
        weight: apiProduct.weight,
        stock: apiProduct.stock,
        isFeatured: apiProduct.is_featured === 1,
        status: "active",
        createdAt: apiProduct.created_at.split("T")[0],
        updatedAt: apiProduct.updated_at.split("T")[0],
      }));

      setProducts(transformedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const filtered = products.filter(p => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase()) ?? false;
    const matchCollection = filterCollection === "all" || p.collection === filterCollection;
    const matchCategory = filterCategory === "all" || p.category === filterCategory;
    return matchSearch && matchCollection && matchCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-card rounded-xl p-8 border border-border shadow-sm text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  const handleSave = async (product: Product) => {
    try {
      const token = localStorage.getItem("token");
      
      if (editProduct) {
        // For editing, call PUT API
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/products/${product.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: product.name,
            slug: product.sku.toLowerCase().replace(/_/g, "-"),
            price: product.price,
            description: product.description,
            main_image: product.image,
            category: product.category,
            collection_type: product.collection,
            material: product.material,
            occasion: product.occasion,
            weight: product.weight,
            stock: product.stock,
            is_featured: product.isFeatured ? 1 : 0,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update product");
        }

        await loadProducts();
        toast({ title: "Product updated", description: `${product.name} has been updated.` });
      } else {
        // For new product, call POST API
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/products`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: product.name,
            slug: product.sku.toLowerCase().replace(/_/g, "-"),
            price: product.price,
            description: product.description,
            main_image: product.image,
            category: product.category,
            collection_type: product.collection,
            material: product.material,
            occasion: product.occasion,
            weight: product.weight,
            stock: product.stock,
            is_featured: product.isFeatured ? 1 : 0,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add product");
        }

        await loadProducts();
        toast({ title: "Product added", description: `${product.name} has been added.` });
      }
      setEditProduct(null);
      setFormOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save product",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      await loadProducts();
      toast({ title: "Product deleted", description: `${name} has been removed.` });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete product",
        variant: "destructive"
      });
    }
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
              placeholder="Search by name..."
              className="pl-9"
            />
          </div>
          <Select value={filterCollection} onValueChange={setFilterCollection}>
            <SelectTrigger className="w-32"><SelectValue placeholder="Collection" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Collections</SelectItem>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="western">Western</SelectItem>
              <SelectItem value="leather">Leather</SelectItem>
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

        </div>
        <Button onClick={openAdd} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>

      {/* Table */}
      <div className="bg-white dark:bg-card rounded-xl border border-border overflow-x-auto shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead className="w-12">#</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Collection</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Occasion</TableHead>
              <TableHead className="text-right">Price</TableHead>
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
                <TableCell>
                  <Badge variant="outline" className="capitalize text-xs">{product.collection}</Badge>
                </TableCell>
                <TableCell className="text-sm">{product.category}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{product.occasion || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <p className="text-sm font-medium">{formatPrice(product.price)}</p>
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
