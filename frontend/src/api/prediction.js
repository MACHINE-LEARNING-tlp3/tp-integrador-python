export const predictionAPi = async (valores) => {
    const response = await fetch("http://localhost:8000/prediccion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(valores),
    });
    const data = await response.json();

    return data
};