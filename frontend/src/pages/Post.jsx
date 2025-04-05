import { useState } from "react";
import Sidebar from "../components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "../hooks/useAuth";
import { Upload } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Post() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_BACKEND_URL}/post/new`;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("breed", breed);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("user", user.id);
    formData.append("image", image);

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setLoading(false);
      if (response.ok) {
        alert("Mascota publicada con éxito");
        setName("");
        setBreed("");
        setAge("");
        setGender("");
        setImage(null);
      }
      if (result.error) {
        setError(result.error);
      }
    } catch (error) {
      setError("Error al publicar la mascota");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Publicar Mascota
            </CardTitle>
            {loading && (
              <div className="flex items-center justify-center">
                <ClipLoader color="#000" size={15} />
              </div>
            )}
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
              <Input
                type="text"
                placeholder="Raza"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
                disabled={loading}
              />
              <Input
                type="number"
                placeholder="Edad en años"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                disabled={loading}
              />

              <Select onValueChange={setGender} required disabled={loading}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Macho">Macho</SelectItem>
                  <SelectItem value="Hembra">Hembra</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex flex-col items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
                  id="file-upload"
                  required
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer"
                >
                  <Upload size={18} /> Subir Foto
                </label>
                {image && <p className="text-sm text-gray-500">{image.name}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                Publicar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
