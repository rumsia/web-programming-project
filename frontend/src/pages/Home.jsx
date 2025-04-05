import Sidebar from "../components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              🐶 Bienvenido a Adopta
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              Encuentra a tu compañero ideal y dale un hogar lleno de amor.
              Explora las opciones de adopción o publica para ayudar a perritos
              que buscan familia.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button variant="default" onClick={() => navigate("/adopt")}>
                Explorar Adopciones
              </Button>
              <Button variant="outline" onClick={() => navigate("/post")}>
                Publicar Mascota
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
