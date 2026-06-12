import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function IndexPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/app/maintenance", { replace: true });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1E3A5F]">
      <div className="text-white text-center">
        <div className="w-16 h-16 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-lg font-semibold">Loading AutoMate...</p>
      </div>
    </div>
  );
}
