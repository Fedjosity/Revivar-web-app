/**
 * Customize Page
 * Allows users to customize their thank you card and download it
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import type {
  UnsplashImage,
  CardCustomization,
  FontFamily,
} from "@/types/unsplash";
import { CardPreview } from "@/components/CardPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const Customize = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(
    null
  );
  const [downloading, setDownloading] = useState(false);

  // Customization state
  const [customization, setCustomization] = useState<CardCustomization>({
    imageUrl: "",
    userName: "",
    fontFamily: "serif",
    fontColor: "#ffffff",
  });

  // Load selected image from session storage
  useEffect(() => {
    const storedImage = sessionStorage.getItem("selectedImage");
    if (!storedImage) {
      toast.error("No image selected. Redirecting...");
      navigate("/");
      return;
    }

    const image: UnsplashImage = JSON.parse(storedImage);
    setSelectedImage(image);
    setCustomization((prev) => ({
      ...prev,
      imageUrl: image.urls.regular,
    }));
  }, [navigate]);

  // Handle download card as PNG
  const handleDownload = async () => {
    const cardElement = document.getElementById("thank-you-card");
    if (!cardElement) {
      toast.error("Card preview not found");
      return;
    }

    if (!customization.userName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setDownloading(true);
    toast.info("Generating your card...");

    try {
      // Use html2canvas to capture the card
      const canvas = await html2canvas(cardElement, {
        scale: 3, // High quality
        useCORS: true,
        backgroundColor: null,
      });

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error("Failed to generate image");
          setDownloading(false);
          return;
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `thank-you-card-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast.success("Card downloaded successfully!");
        setDownloading(false);
      }, "image/png");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download card. Please try again.");
      setDownloading(false);
    }
  };

  if (!selectedImage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-6xl"
        >
          <h1 className="mb-8 text-center text-3xl font-bold text-foreground md:text-4xl">
            Customize Your Card
          </h1>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: Preview */}
            <div className="flex items-center justify-center">
              <CardPreview customization={customization} />
            </div>

            {/* Right: Customization Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h2 className="mb-6 text-xl font-semibold text-card-foreground">
                  Personalization Options
                </h2>

                <div className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <Label htmlFor="userName" className="text-sm font-medium">
                      Your Name
                    </Label>
                    <Input
                      id="userName"
                      type="text"
                      placeholder="Enter your name"
                      value={customization.userName}
                      onChange={(e) =>
                        setCustomization((prev) => ({
                          ...prev,
                          userName: e.target.value,
                        }))
                      }
                      className="h-12 text-base"
                    />
                  </div>

                  {/* Font Family Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="fontFamily" className="text-sm font-medium">
                      Font Style
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {(
                        ["serif", "sans", "cursive", "mono"] as FontFamily[]
                      ).map((font) => (
                        <Button
                          key={font}
                          variant={
                            customization.fontFamily === font
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            setCustomization((prev) => ({
                              ...prev,
                              fontFamily: font,
                            }))
                          }
                          className="h-12 capitalize"
                        >
                          {font}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Color Picker */}
                  <div className="space-y-2">
                    <Label htmlFor="fontColor" className="text-sm font-medium">
                      Text Color
                    </Label>
                    <div className="flex gap-3">
                      <input
                        id="fontColor"
                        type="color"
                        value={customization.fontColor}
                        onChange={(e) =>
                          setCustomization((prev) => ({
                            ...prev,
                            fontColor: e.target.value,
                          }))
                        }
                        className="h-12 w-20 cursor-pointer rounded-lg border border-border bg-input"
                      />
                      <Input
                        type="text"
                        value={customization.fontColor}
                        onChange={(e) =>
                          setCustomization((prev) => ({
                            ...prev,
                            fontColor: e.target.value,
                          }))
                        }
                        className="h-12 flex-1 text-base font-mono"
                        placeholder="#ffffff"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Choose a color that contrasts well with your image
                    </p>
                  </div>

                  {/* Download Button */}
                  <Button
                    size="lg"
                    onClick={handleDownload}
                    disabled={downloading || !customization.userName.trim()}
                    className="h-14 w-full gap-2 text-base font-semibold"
                  >
                    {downloading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5" />
                        Download Card
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Photo Credit */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 rounded-lg bg-card p-4 text-center text-sm text-muted-foreground"
              >
                <p>
                  Photo by{" "}
                  <a
                    href={
                      selectedImage.user.portfolio_url ||
                      `https://unsplash.com/@${selectedImage.user.username}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline hover:text-primary"
                  >
                    {selectedImage.user.name}
                  </a>{" "}
                  on Unsplash
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Customize;
