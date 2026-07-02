"use client";

import { useState } from "react";
import { useWallpaperStore } from "@/store/useWallpaperStore";
import { WallpaperCard } from "@/components/wallpaper-card";
import { Heart, History, FolderHeart, Sparkles, FolderPlus, Plus, X, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "@/store/useToastStore";

export default function FavoritesPage() {
  const {
    favorites,
    generatedWallpapers,
    collections,
    createCollection,
    deleteCollection,
    toggleWallpaperInCollection
  } = useWallpaperStore();

  const { showToast } = useToastStore();

  const [activeTab, setActiveTab] = useState<"favorites" | "history" | "collections">("favorites");
  const [newColName, setNewColName] = useState("");
  const [newColDesc, setNewColDesc] = useState("");
  const [showColModal, setShowColModal] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) {
      showToast("Collection name is required.", "error");
      return;
    }
    createCollection(newColName, newColDesc);
    setNewColName("");
    setNewColDesc("");
    setShowColModal(false);
    showToast("Collection created successfully!", "success");
  };

  const getActiveCollection = () => {
    return collections.find((c) => c.id === selectedCollectionId);
  };

  const getCollectionWallpapers = () => {
    const col = getActiveCollection();
    if (!col) return [];
    // Wallpapers can be in favorites or generated history
    const all = [...favorites, ...generatedWallpapers];
    // Filter duplicates
    const unique = all.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
    return unique.filter((wp) => col.wallpaperIds.includes(wp.id));
  };

  const activeCollection = getActiveCollection();
  const collectionWallpapers = getCollectionWallpapers();

  return (
    <main className="min-h-screen bg-background py-12 relative overflow-hidden grid-bg">
      <div className="absolute top-20 right-10 w-[300px] h-[300px] radial-glow pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              My Creative Space
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your personal favorites, curated collections, and generated history.
            </p>
          </div>

          {activeTab === "collections" && !selectedCollectionId && (
            <button
              onClick={() => setShowColModal(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-500/10 transition-transform active:scale-95"
            >
              <FolderPlus className="w-4.5 h-4.5" />
              <span>Create Collection</span>
            </button>
          )}
        </div>

        {/* Tab Controls */}
        <div className="border-b border-border flex justify-between items-center">
          <div className="flex gap-2">
            {[
              { id: "favorites", label: "Favorites", icon: Heart, count: favorites.length },
              { id: "history", label: "Generation History", icon: History, count: generatedWallpapers.length },
              { id: "collections", label: "Collections", icon: FolderHeart, count: collections.length }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id && !selectedCollectionId;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSelectedCollectionId(null);
                  }}
                  className={`px-4 py-3 text-sm font-semibold transition-all relative flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "text-primary dark:text-indigo-400 border-b-2 border-indigo-500"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full border border-border text-muted-foreground font-mono">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedCollectionId && (
            <button
              onClick={() => setSelectedCollectionId(null)}
              className="text-xs font-semibold text-indigo-500 hover:text-indigo-600 cursor-pointer flex items-center gap-1"
            >
              <span>Back to Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Main Tabs Contents */}
        <div className="space-y-6">
          
          {/* Active Collection Filter View */}
          {selectedCollectionId && activeCollection && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-border bg-card flex justify-between items-center shadow-sm">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-1.5">
                    <FolderHeart className="w-5.5 h-5.5 text-indigo-500" />
                    <span>{activeCollection.name}</span>
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {activeCollection.description || "No description provided."}
                  </p>
                </div>
                <button
                  onClick={() => {
                    deleteCollection(activeCollection.id);
                    setSelectedCollectionId(null);
                    showToast("Collection deleted", "info");
                  }}
                  className="p-2 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors cursor-pointer"
                  title="Delete Collection Folder"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>

              {collectionWallpapers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collectionWallpapers.map((wp) => (
                    <WallpaperCard key={wp.id} wallpaper={wp} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center space-y-3 border border-border border-dashed rounded-3xl">
                  <FolderHeart className="w-12 h-12 text-muted-foreground mx-auto" />
                  <h4 className="font-semibold text-foreground">Collection is empty</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Add wallpapers to this collection using the download preview metadata configuration panel.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 1: Favorites */}
          {activeTab === "favorites" && !selectedCollectionId && (
            favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((wp) => (
                  <WallpaperCard key={wp.id} wallpaper={wp} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-3 border border-border border-dashed rounded-3xl">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto" />
                <h4 className="font-semibold text-foreground">No Favorites Saved</h4>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Wallpapers you favorite will show up here. Try generating an AI wallpaper or browse reference gallery concepts.
                </p>
              </div>
            )
          )}

          {/* Tab 2: Generation History */}
          {activeTab === "history" && !selectedCollectionId && (
            generatedWallpapers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedWallpapers.map((wp) => (
                  <WallpaperCard key={wp.id} wallpaper={wp} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-3 border border-border border-dashed rounded-3xl">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto" />
                <h4 className="font-semibold text-foreground">No Generates Logged</h4>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Wallpapers you successfully generate using the chatbot interface will appear in this local history stream.
                </p>
              </div>
            )
          )}

          {/* Tab 3: Collections Folders */}
          {activeTab === "collections" && !selectedCollectionId && (
            collections.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((col) => (
                  <div
                    key={col.id}
                    onClick={() => setSelectedCollectionId(col.id)}
                    className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4 hover:-translate-y-0.5"
                  >
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                        <FolderHeart className="w-5.5 h-5.5 text-indigo-500" />
                      </div>
                      <span className="text-xs font-mono bg-muted border border-border px-2 py-0.5 rounded text-muted-foreground">
                        {col.wallpaperIds.length} items
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-foreground line-clamp-1">{col.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {col.description || "No description provided."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-3 border border-border border-dashed rounded-3xl">
                <FolderHeart className="w-12 h-12 text-muted-foreground mx-auto" />
                <h4 className="font-semibold text-foreground">No Collections Created</h4>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Create custom collection folders to group wallpapers by theme, colors, or resolutions.
                </p>
                <button
                  onClick={() => setShowColModal(true)}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer"
                >
                  Create Folder
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* Create Collection Dialog */}
      <AnimatePresence>
        {showColModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-card border border-border p-6 rounded-2xl shadow-2xl space-y-5 text-foreground"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">New Collection Folder</h3>
                <button
                  onClick={() => setShowColModal(false)}
                  className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCollection} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Folder Name</label>
                  <input
                    type="text"
                    required
                    value={newColName}
                    onChange={(e) => setNewColName(e.target.value)}
                    placeholder="e.g. Minimalist Desktops"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-foreground"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Description (Optional)</label>
                  <textarea
                    rows={3}
                    value={newColDesc}
                    onChange={(e) => setNewColDesc(e.target.value)}
                    placeholder="Brief summary of what wallpapers fit here..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-foreground"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4.5 h-4.5" />
                  <span>Create Collection</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
