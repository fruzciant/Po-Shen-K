# Po-Shen K (AI's version)
(**No significa que utilice Inteligencia artificial**).

**Po-Shen K** es una calculadora para ecuaciones de segundo grado que utiliza el **método de Po-Shen Loh**, un enfoque intuitivo y educativo para resolver ecuaciones cuadráticas.

## 🎯 Características

✅ **Método de Po-Shen Loh**: Implementación completa del método intuitivo  
✅ **Raíces Reales y Complejas**: Soporte para todo tipo de raíces  
✅ **Pasos Educativos**: Muestra el proceso completo paso a paso  
✅ **Interfaz Web Moderna**: Aplicación web interactiva con diseño premium  
✅ **Notebook Python**: Implementación educativa en Jupyter  

## 🚀 Uso

### Opción 1: Aplicación Web

Simplemente abre `index.html` en tu navegador favorito:

```bash
# Desde la terminal
open index.html
# o
xdg-open index.html
```

¡Y listo! Ingresa los coeficientes a, b, c y haz clic en "Calcular".

### Opción 2: Python Notebook

Abre `main.ipynb` en Jupyter Notebook o JupyterLab:

```bash
jupyter notebook main.ipynb
```

Ejecuta las celdas para ver el método en acción con diferentes casos de prueba.

## 📐 ¿Qué es el Método de Po-Shen Loh?

El método de Po-Shen Loh es un enfoque revolucionario para resolver ecuaciones cuadráticas que se basa en las **fórmulas de Vieta** en lugar de memorizar la fórmula cuadrática tradicional.

### Para una ecuación **x² + bx + c = 0**:

1. **Las raíces suman -b** (fórmula de Vieta)
2. **Su promedio es -b/2**
3. Podemos expresar las raíces como: **(-b/2) ± u**
4. Usando el producto (r₁ × r₂ = c): **(-b/2 - u)(-b/2 + u) = c**
5. Simplificando: **(b/2)² - u² = c**
6. Por lo tanto: **u = √((b/2)² - c)**

### Resultado:
**x = -b/2 ± √((b/2)² - c)**

Esta derivación es más intuitiva que memorizar la fórmula cuadrática tradicional.

## 💡 Ejemplos

### Ejemplo 1: Raíces reales distintas
**Ecuación:** x² - 5x + 6 = 0  
**Solución:** x₁ = 3, x₂ = 2

### Ejemplo 2: Raíces complejas
**Ecuación:**  x² + 2x + 5 = 0 
**Solución:** x₁ = -1 + 2i, x₂ = -1 - 2i

### Ejemplo 3: Raíz doble
**Ecuación:** x² - 4x + 4 = 0  
**Solución:** x₁ = x₂ = 2

## 🛠️ Tecnologías

- **Web**: HTML5, CSS3 (Glassmorphism), JavaScript (ES6+)
- **Python**: Python 3.8+, Jupyter Notebook
- **Matemáticas**: Fórmulas de Vieta, números complejos

## 📚 Referencias

- [Po-Shen Loh's Method](https://www.poshenloh.com/quadratic/)
- Método presentado por el matemático Po-Shen Loh en 2019

## 📄 Licencia

Este proyecto está bajo la licencia especificada en el archivo LICENSE.

