import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Exhibitions from "./pages/Exhibitions";
import Media from "./pages/Media";
import Armenia2019 from "./pages/exhibitions/Armenia2019";
import Italy2020 from "./pages/exhibitions/Italy2020";
import Armenia2022 from "./pages/exhibitions/Armenia2022";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/exhibitions/armenia-2019" element={<Armenia2019 />} />
          <Route path="/exhibitions/italy-2020" element={<Italy2020 />} />
          <Route path="/exhibitions/armenia-2022" element={<Armenia2022 />} />
          <Route path="/media" element={<Media />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
