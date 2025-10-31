/**
 * Index Page - Homepage
 * Displays random Unsplash images and search functionality
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { fetchRandomImages, searchImages } from "@/lib/unsplash";
import type { UnsplashImage } from "@/types/unsplash";
import { ImageCard } from "@/components/ImageCard";
import { SearchBar } from "@/components/SearchBar";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearchMode, setIsSearchMode] = useState(false);

  // Fetch random images on initial load
  useEffect(() => {
    loadRandomImages();
  }, []);

  const loadRandomImages = async () => {
    setLoading(true);
    setIsSearchMode(false);
    try {
      const data = await fetchRandomImages(4);
      setImages(data);
      toast.success("Welcome to the Thank You Card Generator!");
    } catch (error) {
      toast.error("Failed to load images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadRandomImages();
      return;
    }

    setLoading(true);
    setIsSearchMode(true);
    setCurrentPage(1);

    try {
      const data = await searchImages(searchQuery, 1, 8);
      setImages(data.results);
      setTotalPages(data.total_pages);
      toast.success(`Found ${data.total} images for your search`);
    } catch (error) {
      toast.error("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    setLoading(true);
    setCurrentPage(newPage);

    try {
      const data = await searchImages(searchQuery, newPage, 8);
      setImages(data.results);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error("Failed to load page. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (image: UnsplashImage) => {
    // Store selected image in session storage
    sessionStorage.setItem("selectedImage", JSON.stringify(image));
    navigate("/customize");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-2">
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                Thank You Card Generator
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Create beautiful personalized cards with stunning images
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="mt-8 flex justify-center">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Search for images (e.g., nature, city, abstract)..."
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <LoadingSkeleton count={isSearchMode ? 8 : 4} />
        ) : images.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="text-xl text-muted-foreground">
              No images found. Try a different search term.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Image Gallery */}
            <div
              className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${
                isSearchMode ? "lg:grid-cols-4" : "lg:grid-cols-4"
              }`}
            >
              {images.map((image, index) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  onClick={handleImageSelect}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination for search results */}
            {isSearchMode && totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 flex items-center justify-center gap-4"
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="rounded-lg bg-card px-4 py-2 text-card-foreground">
                  Page {currentPage} of {Math.min(totalPages, 10)}
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages || currentPage >= 10}
                  className="gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </>
        )}

        {/* Load Random Images Button */}
        {isSearchMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <Button
              variant="secondary"
              size="lg"
              onClick={loadRandomImages}
              className="gap-2"
            >
              Load Random Images
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Index;
