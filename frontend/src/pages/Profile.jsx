import { useState } from "react";
import Sidebar from "../components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [userData, setUserData] = useState({
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/update`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el perfil");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setUser({
          ...user,
          name: userData.name,
          lastname: userData.lastname,
          email: userData.email,
        });
        alert("Perfil actualizado correctamente");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Editar Perfil
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Nombre</Label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <Input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    className="pl-10"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Apellido</Label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <Input
                    type="text"
                    name="lastname"
                    value={userData.lastname}
                    onChange={handleChange}
                    className="pl-10"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <Input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Nueva Contraseña</Label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <Input
                    type="password"
                    name="password"
                    value={userData.password}
                    disabled={loading}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                Guardar Cambios
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
