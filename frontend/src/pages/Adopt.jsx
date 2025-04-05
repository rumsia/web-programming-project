import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Adopt() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/post`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Mascotas en Adopción</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading
            ? [...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))
            : posts.map((post) => (
                <Card key={post._id} className="shadow-lg">
                  <CardHeader>
                    <CardTitle>{post.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        post.image
                      }`}
                      alt={post.name}
                      className="h-40 w-full object-cover rounded-lg"
                    />
                    <p className="text-gray-600 mt-2">{post.breed}</p>
                    <p className="text-sm text-gray-500">
                      Edad: {post.age} años
                    </p>
                    <p className="text-sm text-gray-500">
                      Género: {post.gender}
                    </p>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="mt-3 w-full"
                          onClick={() => setSelectedUser(post.user)}
                        >
                          Ver Contacto
                        </Button>
                      </DialogTrigger>
                      {selectedUser && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Información de Contacto</DialogTitle>
                          </DialogHeader>
                          <p>
                            <strong>Nombre:</strong> {selectedUser.name}{" "}
                            {selectedUser.lastname}
                          </p>
                          <p>
                            <strong>Email:</strong> {selectedUser.email}
                          </p>
                        </DialogContent>
                      )}
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
}
