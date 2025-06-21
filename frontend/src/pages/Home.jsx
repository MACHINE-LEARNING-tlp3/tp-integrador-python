import React, { useState } from "react";
import { Header } from "../components/Header";
import {
  HeartPulse,
  Activity,
  Stethoscope,
  AlertTriangle,
  Calendar,
  Search,
  UserCheck,
} from "lucide-react";
import homeImg from "../assets/home.png";
import { predictionAPi } from "../api/prediction";

function Home() {
  const [formData, setFormData] = useState({
    concave_points_worst: "",
    perimeter_worst: "",
    concave_points_mean: "",
    radius_worst: "",
    perimeter_mean: "",
    area_worst: "",
    radius_mean: "",
    area_mean: "",
    concavity_mean: "",
    concavity_worst: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await predictionAPi(
        formData.concave_points_worst,
        formData.perimeter_worst,
        formData.concave_points_mean,
        formData.radius_worst,
        formData.perimeter_mean,
        formData.area_worst,
        formData.radius_mean,
        formData.area_mean,
        formData.concavity_mean,
        formData.concavity_worst
      );

      if (res?.status === 200) {
        alert(`Diagnóstico: ${res.diagnostico}`);
      } else {
        alert("No se pudo obtener un diagnóstico. Intente nuevamente.");
      }
    } catch (error) {
      console.error("Error al predecir:", error);
      alert("Ocurrió un error al procesar los datos.");
    }
  };

  return (
    <>
      <Header />
      <main className="bg-[#E8C0C9] mt-20">
        {/* Sección informativa */}
        <section
          id="Inicio"
          className="min-h-screen px-6 py-12 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10"
        >
          <div className="w-full h-full lg:w-1/2">
            <img
              src={homeImg}
              alt="Ilustración cáncer de mama"
              className="rounded-xl shadow-lg w-full"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-pink-800 mb-6">
              Cáncer de mama en Argentina: una realidad que podemos cambiar
            </h1>

            <p className="mb-4 text-lg text-gray-800 flex items-start gap-2">
              <HeartPulse className="text-pink-700 w-5 h-5" />
              El cáncer de mama es el tipo de cáncer más común en mujeres en Argentina.
            </p>

            <p className="mb-4 text-lg text-gray-800 flex items-start gap-2">
              <Activity className="text-pink-700 w-5 h-5" />
              Se diagnostican 22.000 nuevos casos cada año y es la principal causa de muerte por tumores en mujeres.
            </p>

            <p className="mb-4 text-lg text-gray-800 font-semibold">Datos de 2022:</p>
            <ul className="list-none space-y-2 text-gray-800">
              <li className="flex gap-2 items-start">
                <Stethoscope className="text-pink-700 w-5 h-5" />
                5.750 fallecimientos registrados.
              </li>
              <li className="flex gap-2 items-start">
                <AlertTriangle className="text-pink-700 w-5 h-5" />
                Tasa de mortalidad: 24,4 por cada 100.000 mujeres.
              </li>
              <li className="flex gap-2 items-start">
                <Calendar className="text-pink-700 w-5 h-5" />
                Provincias con mayor mortalidad: San Luis y Tierra del Fuego.
              </li>
            </ul>

            <p className="mt-6 text-lg text-gray-800 font-semibold">¿Cómo prevenirlo?</p>
            <ul className="list-none space-y-2 text-gray-800 mt-2">
              <li className="flex gap-2 items-start">
                <Search className="text-pink-700 w-5 h-5" />
                Mamografías anuales desde los 40 años.
              </li>
              <li className="flex gap-2 items-start">
                <UserCheck className="text-pink-700 w-5 h-5" />
                Autoexploraciones regulares.
              </li>
              <li className="flex gap-2 items-start">
                <Stethoscope className="text-pink-700 w-5 h-5" />
                Consultar al médico ante cualquier síntoma.
              </li>
            </ul>

            <p className="mt-6 text-lg text-gray-800">
              Aunque Argentina tiene una de las tasas más altas de mortalidad en América,
              se logró una reducción del 1% anual entre 2002 y 2022.
            </p>
          </div>
        </section>

        {/* Sección predicción */}
        <section
          id="Prediccion"
          className="min-h-screen px-6 py-12 max-w-6xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-10"
        >
          <div className="w-full lg:w-1/2 text-left">
            <h2 className="text-2xl font-bold text-pink-900 mb-4">Modelo de Predicción</h2>
            <p className="text-gray-700 mb-4">
              Usamos un modelo de <strong>regresión logística</strong> para estimar la probabilidad de desarrollar cáncer de mama, basado en factores clínicos.
            </p>
            <p className="text-gray-700">
              Esta herramienta no reemplaza a un diagnóstico médico, pero puede ayudarte a tomar decisiones informadas.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <form onSubmit={handleForm} className="space-y-6 w-full max-w-md mx-auto text-left">
              <fieldset className="border border-gray-300 p-4 rounded-lg shadow-sm">
                <legend className="text-lg font-semibold text-pink-900 px-2 mb-4">
                  Ingresá los valores clínicos
                </legend>

                {Object.entries(formData).map(([name, value]) => (
                  <div key={name}>
                    <label
                      htmlFor={name}
                      className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                    >
                      {name.replace(/_/g, " ")}
                    </label>
                    <input
                      type="number"
                      id={name}
                      name={name}
                      value={value}
                      onChange={handleChange}
                      step="any"
                      min="0"
                      required
                      placeholder="Ingresá un valor numérico"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                ))}
              </fieldset>

              <button
                type="submit"
                className="w-full bg-[#66021f] text-white py-2 rounded hover:bg-pink-800 transition"
              >
                Calcular riesgo
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
