import React, { useState } from "react";
import { Header } from "../components/Header";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import {
  HeartPulse,
  Activity,
  Stethoscope,
  AlertTriangle,
  Search,
  UserCheck,
  Loader,
  Cpu,
  Shield,
  Info,
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarCampos = () => {
    for (const [clave, valor] of Object.entries(formData)) {
      if (valor === "" || isNaN(parseFloat(valor))) {
        toast.error(
          `El campo "${clave.replace(/_/g, " ")}" debe ser numérico.`,
          { duration: 5000 }
        );
        return false;
      }
    }
    return true;
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (!validarCampos()) return;

    const dataNumerica = Object.fromEntries(
      Object.entries(formData).map(([clave, valor]) => [
        clave,
        parseFloat(valor),
      ])
    );

    try {
      setIsLoading(true);
      Swal.fire({
        title: "Calculando riesgo...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await predictionAPi(dataNumerica);
      Swal.close();

      let colorClase = "";
      let icono = "";
     
      if (res.probabilidad >= 50) {
        colorClase = "text-red-500";
        icono = "error";
       
      } else if (res.probabilidad >= 20) {
        colorClase = "text-yellow-500";
        icono = "warning";
       
      } else {
        colorClase = "text-green-500";
        icono = "success";
       
      }

      Swal.fire({
        icon: icono,
        title: `Diagnóstico: ${res.diagnostico}`,
        html: `
    <div class="text-base">
      <strong class="${colorClase}">Probabilidad:</strong> ${res.probabilidad}%<br/>
      
    </div>
  `,
        confirmButtonColor: "#66021f",
      });
    } catch (error) {
      console.log(error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al predecir.",
        confirmButtonColor: "#66021f",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <main className="bg-[#F8F1F3] min-h-screen pt-20 pb-12">
        <section id="Inicio" className="px-6 py-12 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#66021f] mb-4">
              Prevención del Cáncer de Mama con Machine Learning
            </h1>
            <p className="text-xl text-[#A53860] max-w-3xl mx-auto">
              Herramienta predictiva para profesionales de la salud
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <img
                src={homeImg}
                alt="Ilustración cáncer de mama"
                className="rounded-xl shadow-lg w-full max-w-lg mx-auto transform hover:scale-105 transition duration-500"
              />
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-[#E0C0C9]">
                <h2 className="text-2xl font-bold text-[#66021f] mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6" />
                  Datos clave en Argentina
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-[#F8E8EC] rounded-lg">
                    <p className="text-gray-800 flex items-start gap-3">
                      <HeartPulse className="text-[#66021f] w-5 h-5 flex-shrink-0" />
                      <span>
                        El cáncer de mama representa el 17% de todos los
                        cánceres en mujeres.
                      </span>
                    </p>
                  </div>
                  <div className="p-4 bg-[#F8E8EC] rounded-lg">
                    <p className="text-gray-800 flex items-start gap-3">
                      <Activity className="text-[#66021f] w-5 h-5 flex-shrink-0" />
                      <span>
                        1 de cada 8 mujeres desarrolla cáncer de mama a lo largo
                        de su vida.
                      </span>
                    </p>
                  </div>
                  <div className="p-4 bg-[#F8E8EC] rounded-lg">
                    <p className="text-gray-800 flex items-start gap-3">
                      <AlertTriangle className="text-[#66021f] w-5 h-5 flex-shrink-0" />
                      <span>
                        La detección temprana aumenta la supervivencia a más del
                        90%.
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-[#E0C0C9]">
                <h3 className="text-xl font-semibold text-[#66021f] mb-3">
                  Recomendaciones de prevención
                </h3>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex gap-3 items-start p-3 hover:bg-[#F8E8EC] rounded-lg transition">
                    <Search className="text-[#66021f] w-5 h-5 flex-shrink-0" />
                    <div>
                      <strong>Mamografías anuales</strong>
                      <p className="text-sm text-gray-600">
                        A partir de los 40 años o antes si hay factores de
                        riesgo
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start p-3 hover:bg-[#F8E8EC] rounded-lg transition">
                    <UserCheck className="text-[#66021f] w-5 h-5 flex-shrink-0" />
                    <div>
                      <strong>Autoexámenes mensuales</strong>
                      <p className="text-sm text-gray-600">
                        Realizar palpación mamaria 7-10 días después del período
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start p-3 hover:bg-[#F8E8EC] rounded-lg transition">
                    <Stethoscope className="text-[#66021f] w-5 h-5 flex-shrink-0" />
                    <div>
                      <strong>Consulta médica inmediata</strong>
                      <p className="text-sm text-gray-600">
                        Ante cualquier cambio, nódulo o secreción
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Modelo Predictivo */}
        <section id="Prediccion" className="px-6 py-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#66021f] mb-4">
                Modelo Predictivo de Riesgo
              </h2>
              <p className="text-xl text-[#A53860] max-w-3xl mx-auto">
                Tecnología de vanguardia para evaluación temprana
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="bg-[#F8F1F3] p-8 rounded-xl shadow-sm border border-[#E0C0C9]">
                  <h3 className="text-2xl font-bold text-[#66021f] mb-4 flex items-center gap-2">
                    <Cpu className="w-6 h-6" />
                    ¿Cómo funciona nuestro modelo?
                  </h3>
                  <p className="text-gray-700 mb-6">
                    El modelo de aprendizaje automático esta entrenado con miles
                    de casos reales para identificar patrones predictivos de
                    cáncer de mama.
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-[#66021f] mb-2 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Beneficios clave
                      </h4>
                      <ul className="space-y-3 text-gray-700 pl-2">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#66021f] mt-2 flex-shrink-0"></div>
                          <span>
                            Analiza múltiples variables simultáneamente
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#66021f] mt-2 flex-shrink-0"></div>
                          <span>Proporciona resultados en segundos</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8F1F3] p-8 rounded-xl shadow-sm border border-[#E0C0C9]">
                  <h3 className="text-2xl font-bold text-[#66021f] mb-4">
                    Interpretación de resultados
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex-shrink-0 mt-1"></div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Bajo riesgo (0-20%)
                        </h4>
                        <p className="text-sm text-gray-600">
                          Continuar con controles rutinarios según protocolo.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-yellow-500 flex-shrink-0 mt-1"></div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Riesgo moderado (20-50%)
                        </h4>
                        <p className="text-sm text-gray-600">
                          Considerar estudios adicionales y seguimiento cercano.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-red-500 flex-shrink-0 mt-1"></div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Alto riesgo (50-100%)
                        </h4>
                        <p className="text-sm text-gray-600">
                          Evaluación médica inmediata y plan de acción
                          personalizado.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 italic">
                    * Estos porcentajes representan probabilidades estimadas
                    basadas en datos.
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="bg-[#66021f] text-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    Calculadora de Riesgo
                  </h3>
                  <form onSubmit={handleForm} className="space-y-6">
                    <div className="space-y-4">
                      {Object.entries(formData).map(([name, value]) => (
                        <div key={name} className="space-y-2">
                          <label
                            htmlFor={name}
                            className="block text-sm font-medium text-white capitalize"
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
                            placeholder="Ej: 0.1234"
                            className="w-full p-3 bg-white/90 border border-[#A53860] rounded-lg focus:ring-2 focus:ring-white focus:border-white text-[#66021f] transition"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3 px-6 rounded-lg font-bold flex items-center justify-center ${
                        isLoading
                          ? "bg-[#A53860]"
                          : "bg-white text-[#66021f] hover:bg-[#F8E8EC]"
                      } transition duration-300`}
                    >
                      {isLoading ? (
                        <>
                          <Loader className="animate-spin mr-2" />
                          Procesando...
                        </>
                      ) : (
                        "Calcular riesgo ahora"
                      )}
                    </button>
                  </form>
                </div>

                <div className="mt-8 bg-[#F8F1F3] p-6 rounded-xl border border-[#E0C0C9]">
                  <h4 className="text-lg font-semibold text-[#66021f] mb-3">
                    Variables analizadas
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Nuestro modelo considera 10 parámetros clínicos clave
                    obtenidos de biopsias y estudios por imágenes:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#66021f] flex-shrink-0"></div>
                      Radio medio
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#66021f] flex-shrink-0"></div>
                      Perímetro medio
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#66021f] flex-shrink-0"></div>
                      Área media
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#66021f] flex-shrink-0"></div>
                      Concavidad media
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#66021f] flex-shrink-0"></div>
                      Puntos cóncavos medios
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#66021f] flex-shrink-0"></div>
                      Radio peor
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#66021f] flex-shrink-0"></div>
                      Perímetro peor
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#66021f] flex-shrink-0"></div>
                      Área peor
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#66021f] flex-shrink-0"></div>
                      Concavidad peor
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#66021f] flex-shrink-0"></div>
                      Puntos cóncavos peores
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Aclaración Médica */}
        <section className="px-6 py-12 max-w-6xl mx-auto">
          <div className="bg-[#F8E8EC] p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold text-[#66021f] mb-4">
              Importante
            </h3>
            <p className="text-gray-800 mb-4">
              Esta herramienta está diseñada para <strong>apoyar</strong> a
              profesionales de la salud y <strong>no reemplaza</strong> el
              juicio clínico.
            </p>
            <p className="text-gray-800">
              Los resultados deben interpretarse en el contexto del cuadro
              clínico completo del paciente.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
