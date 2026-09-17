import CyberpunkBikeGame from "@/components/cyberCityGame";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import { Footer } from "react-day-picker";
import { useNavigate } from "react-router-dom";

const CyberCityGamePage = () => {

    const navigate = useNavigate();
  
    
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </button>


      <CyberpunkBikeGame />

      

      
    </div>
  )
}


export default CyberCityGamePage;
