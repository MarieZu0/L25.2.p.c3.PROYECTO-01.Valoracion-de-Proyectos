/**
 *  Sistema de Gestión de Jurados (UCLA)I. Resumen y Arquitectura GeneralEl proyecto 
 * es un Sistema de Gestión de Jurados 2para la Universidad Centroccidental Lisandro Alvarado (UCLA)
 *  33en Barquisimeto, Venezuela44. Es una Aplicación Web 55diseñada para la gestión de la evaluación
 *  y calificación de proyectos propuestos por bachilleres6666. El sistema debe registrar evaluadores
 *  por categoría y procesar resultados de forma ponderada7777.La arquitectura se basa en el siguiente 
 * modelo de 
 * clases:ClaseResponsabilidad PrincipalCL_ControladorGestiona las colecciones de jurados 
 * (#jurados: CL_mJurado[]) y puntuaciones (#puntuaciones: CL_mPuntuacion[]). Es el punto de entrada para 
 * agregar ambos objetos.CL_mJuradoModela un evaluador. Contiene la lógica para validar y gestionar (CRUD)
 *  un solo registro de jurado.CL_PuntajeModela una valoración. Contiene la lógica central para calcular 
 * la puntuación final ponderada y la posición en el ranking.
 * 1. 🎯 Propósito y Rol
La clase CL_mJurado modela al Evaluador o Jurado en el Sistema de Gestión de Jurados de la UCLA.
 Su propósito es encapsular la información del evaluador y su lógica de gestión, principalmente la 
 validación antes de su registro.

2. 🧱 Atributos Clave
Los siguientes atributos deben ser implementados como privados o protegidos (usando # en JS/TS) 
para garantizar el encapsulamiento:



#categoria: string (La categoría asignada, que determina la ponderación).


 */



// Archivo placeholder para evitar el error TS18003

import Cl_controlador from "./Cl_controlador.js";
import Cl_mPrincipal from "./Cl_mPrincipal.js";
import Cl_vPrincipal from "./Cl_vPrincipal.js";
import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251110-2150";

export default class Cl_index {
  private modelo: Cl_mPrincipal;
  
  constructor() {
    this.modelo = new Cl_mPrincipal();
    this.modelo.cargar((error: string | false) => {
      if (error) alert(error);
      if (error) throw new Error(error);

      
      let vista = new Cl_vPrincipal();
      let controlador = new Cl_controlador(this.modelo, vista);
      vista.controlador = controlador;


        this.cargarDatosPrueba();
      
      vista.refresh();
      
      // 🚀 CARGAR DATOS DE PRUEBA AUTOMÁTICAMENTE
      
    });
    
    // Exponer función global para limpiar datos
    (window as any).limpiarTodosDatos = () => this.limpiarTodosDatos();
    
    // Exponer función global para cargar datos de prueba
    (window as any).cargarDatosPrueba = () => this.cargarDatosPrueba();
  }
  
  // 🚀 Método para cargar datos de prueba automáticamente
  private async cargarDatosPrueba(): Promise<void> {
    console.log("🚀 Iniciando carga de datos de prueba UCLA...");
    
    // Mostrar banner de carga
    this.mostrarBannerCarga();
    
    try {
      // Verificar si ya hay datos en el sistema
      const hayDatos = await this.verificarSiHayDatos();
      
      if (hayDatos) {
        console.log("ℹ️ Ya existen datos en el sistema. ¿Desea reemplazar con datos de prueba?");
        if (!confirm("Ya existen datos en el sistema. ¿Desea cargar los datos de prueba y reemplazar los actuales?")) {
          this.ocultarBannerCarga();
          return;
        }
        
        // Limpiar datos existentes
        console.log("🗑️ Limpiando datos existentes...");
        await this.limpiarTodosDatos();
        
        // Esperar a que se complete la limpieza
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      // Cargar datos de prueba
      await this.cargarDatosPruebaCompleta();
      
      // Mostrar mensaje de éxito
      this.mostrarBannerExito();
      
      // Recargar la vista
      setTimeout(() => {
        location.reload();
      }, 2000);
      
    } catch (error) {
      console.error("❌ Error cargando datos de prueba:", error);
      this.mostrarBannerError();
    }
  }
  
  // Verificar si hay datos en el sistema
  private verificarSiHayDatos(): Promise<boolean> {
    return new Promise((resolve) => {
      const db = new Cl_dcytDb({ aliasCuenta: "TERANEXUS CORE" });
      
      // Verificar jurados
      db.listRecords({
        tabla: "Jurado",
        callback: ({ objects: jurados, error }: any) => {
          if (!error && jurados && jurados.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
  
  // Cargar datos de prueba completos
  private async cargarDatosPruebaCompleta(): Promise<void> {
    const db = new Cl_dcytDb({ aliasCuenta: "TERANEXUS CORE" });
    
    // Datos de jurados de prueba
    const juradosPrueba = [
      { nombre: "Dr. Juan García", categoria: "Maestro" },
      { nombre: "Dra. María López", categoria: "Maestro" },
      { nombre: "Ing. Carlos Rodríguez", categoria: "Autoridad" },
      { nombre: "Arq. Patricia Morales", categoria: "Autoridad" },
      { nombre: "Lic. Roberto Fernández", categoria: "Autoridad" },
      { nombre: "Dr. Antonio Sánchez", categoria: "Autoridad" },
      { nombre: "Prof. Isabel García", categoria: "Docente" },
      { nombre: "Prof. Miguel Torres", categoria: "Docente" },
      { nombre: "Prof. Laura Martínez", categoria: "Docente" },
      { nombre: "Prof. Sofía Ramírez", categoria: "Docente" },
      { nombre: "Prof. Daniela Pérez", categoria: "Docente" },
      { nombre: "Inv. Especial 1", categoria: "Invitado" },
      { nombre: "Inv. Especial 2", categoria: "Invitado" },
      { nombre: "Inv. Especial 3", categoria: "Invitado" },
      { nombre: "Inv. Especial 4", categoria: "Invitado" }
    ];
    
    // Datos de puntuaciones de prueba
        const puntuacionesPrueba = [
      { Jurado: "Dr. Juan García", categoriaJurado: "Maestro", equipo: "Equipo Alpha", puntuacionMax: 85, observacion: "Excelente propuesta técnica" },
      { Jurado: "Dr. Juan García", categoriaJurado: "Maestro", equipo: "Equipo Epsilon", puntuacionMax: 90, observacion: "Innovación destacable" },
      { Jurado: "Dra. María López", categoriaJurado: "Maestro", equipo: "Equipo Beta", puntuacionMax: 88, observacion: "Buen análisis del problema" },
      { Jurado: "Dra. María López", categoriaJurado: "Maestro", equipo: "Equipo Zeta", puntuacionMax: 92, observacion: "Solución muy completa" },
      { Jurado: "Ing. Carlos Rodríguez", categoriaJurado: "Autoridad", equipo: "Equipo Alpha", puntuacionMax: 80, observacion: "Propuesta sólida" },
      { Jurado: "Ing. Carlos Rodríguez", categoriaJurado: "Autoridad", equipo: "Equipo Eta", puntuacionMax: 86, observacion: "Buen enfoque técnico" },
      { Jurado: "Arq. Patricia Morales", categoriaJurado: "Autoridad", equipo: "Equipo Beta", puntuacionMax: 83, observacion: "Diseño bien estructurado" },
      { Jurado: "Arq. Patricia Morales", categoriaJurado: "Autoridad", equipo: "Equipo Theta", puntuacionMax: 89, observacion: "Creatividad notable" },
      { Jurado: "Lic. Roberto Fernández", categoriaJurado: "Autoridad", equipo: "Equipo Gamma", puntuacionMax: 87, observacion: "Análisis profundo" },
      { Jurado: "Lic. Roberto Fernández", categoriaJurado: "Autoridad", equipo: "Equipo Iota", puntuacionMax: 90, observacion: "Metodología excelente" },
      { Jurado: "Dr. Antonio Sánchez", categoriaJurado: "Autoridad", equipo: "Equipo Delta", puntuacionMax: 82, observacion: "Propuesta coherente" },
      { Jurado: "Dr. Antonio Sánchez", categoriaJurado: "Autoridad", equipo: "Equipo Kappa", puntuacionMax: 88, observacion: "Implementación sólida" },
      { Jurado: "Prof. Isabel García", categoriaJurado: "Docente", equipo: "Equipo Gamma", puntuacionMax: 78, observacion: "Enfoque interesante" },
      { Jurado: "Prof. Isabel García", categoriaJurado: "Docente", equipo: "Equipo Zeta", puntuacionMax: 84, observacion: "Buena propuesta" },
      { Jurado: "Prof. Miguel Torres", categoriaJurado: "Docente", equipo: "Equipo Delta", puntuacionMax: 81, observacion: "Idea creativa" },
      { Jurado: "Prof. Miguel Torres", categoriaJurado: "Docente", equipo: "Equipo Eta", puntuacionMax: 85, observacion: "Ejecución satisfactoria" },
      { Jurado: "Prof. Laura Martínez", categoriaJurado: "Docente", equipo: "Equipo Epsilon", puntuacionMax: 79, observacion: "Propuesta bien fundamentada" },
      { Jurado: "Prof. Laura Martínez", categoriaJurado: "Docente", equipo: "Equipo Theta", puntuacionMax: 83, observacion: "Buen trabajo en equipo" },
      { Jurado: "Prof. Sofía Ramírez", categoriaJurado: "Docente", equipo: "Equipo Zeta", puntuacionMax: 80, observacion: "Innovación técnica" },
      { Jurado: "Prof. Sofía Ramírez", categoriaJurado: "Docente", equipo: "Equipo Iota", puntuacionMax: 86, observacion: "Excelente desarrollo" },
      { Jurado: "Prof. Daniela Pérez", categoriaJurado: "Docente", equipo: "Equipo Eta", puntuacionMax: 77, observacion: "Propuesta práctica" },
      { Jurado: "Prof. Daniela Pérez", categoriaJurado: "Docente", equipo: "Equipo Kappa", puntuacionMax: 82, observacion: "Implementación efectiva" },
      { Jurado: "Inv. Especial 1", categoriaJurado: "Invitado", equipo: "Equipo Theta", puntuacionMax: 75, observacion: "Buena propuesta" },
      { Jurado: "Inv. Especial 1", categoriaJurado: "Invitado", equipo: "Equipo Alpha", puntuacionMax: 79, observacion: "Ejecución satisfactoria" },
      { Jurado: "Inv. Especial 2", categoriaJurado: "Invitado", equipo: "Equipo Iota", puntuacionMax: 76, observacion: "Idea interesante" },
      { Jurado: "Inv. Especial 2", categoriaJurado: "Invitado", equipo: "Equipo Beta", puntuacionMax: 80, observacion: "Trabajo bien realizado" },
      { Jurado: "Inv. Especial 3", categoriaJurado: "Invitado", equipo: "Equipo Kappa", puntuacionMax: 78, observacion: "Propuesta válida" },
      { Jurado: "Inv. Especial 3", categoriaJurado: "Invitado", equipo: "Equipo Gamma", puntuacionMax: 81, observacion: "Desarrollo apropiado" },
      { Jurado: "Inv. Especial 4", categoriaJurado: "Invitado", equipo: "Equipo Delta", puntuacionMax: 77, observacion: "Propuesta aceptable" },
      { Jurado: "Inv. Especial 4", categoriaJurado: "Invitado", equipo: "Equipo Epsilon", puntuacionMax: 82, observacion: "Buen resultado" }
    ];
    
    // Cargar jurados
    console.log(`📊 Cargando ${juradosPrueba.length} jurados...`);
    for (const jurado of juradosPrueba) {
      const dtJurado = {
        id: null,
        creadoEl: null,
        alias: null,
        nombre: jurado.nombre,
        categoria: jurado.categoria
      };
      
      await new Promise<void>((resolve) => {
        this.modelo.addJurado({
          dtJurado,
          callback: (error: string | false) => {
            if (error) {
              console.error(`❌ Error cargando jurado ${jurado.nombre}:`, error);
            } else {
              console.log(`✅ Jurado cargado: ${jurado.nombre}`);
            }
            resolve();
          }
        });
      });
    }
    
    // Esperar un momento para que se guarden los jurados
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Cargar puntuaciones
    console.log(`📈 Cargando ${puntuacionesPrueba.length} puntuaciones...`);
    for (const puntuacion of puntuacionesPrueba) {
      const dtPuntuacion = {
        id: null,
        creadoEl: null,
        alias: null,
        Jurado: puntuacion.Jurado,
        equipo: puntuacion.equipo,
        puntuacionMax: puntuacion.puntuacionMax,
        observacion: puntuacion.observacion,
        categoriaJurado: puntuacion.categoriaJurado
      };
      
      await new Promise<void>((resolve) => {
        this.modelo.addPuntuacion({
          dtPuntuacion,
          callback: (error: string | false) => {
            if (error) {
              console.error(`❌ Error cargando puntuación ${puntuacion.Jurado} -> ${puntuacion.equipo}:`, error);
            } else {
              console.log(`✅ Puntuación cargada: ${puntuacion.Jurado} -> ${puntuacion.equipo} (${puntuacion.puntuacionMax})`);
            }
            resolve();
          }
        });
      });
    }
  }
  
  // Mostrar banner de carga
  private mostrarBannerCarga(): void {
    const banner = document.createElement('div');
    banner.id = 'banner-carga-datos';
    banner.innerHTML = `
      <div style="
        position: fixed; 
        top: 0; 
        left: 0; 
        right: 0; 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white; 
        padding: 20px; 
        text-align: center; 
        z-index: 10000;
        font-family: Arial, sans-serif;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      ">
        <h2 style="margin: 0 0 10px 0; font-size: 24px;">🚀 Cargando Datos de Prueba UCLA</h2>
        <p style="margin: 0; font-size: 16px;">Iniciando carga automática de jurados y puntuaciones...</p>
        <div style="margin-top: 10px;">
          <div style="width: 200px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px; margin: 0 auto;">
            <div style="width: 0%; height: 100%; background: white; border-radius: 2px; animation: loading 3s infinite;"></div>
          </div>
        </div>
      </div>
      <style>
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      </style>
    `;
    document.body.appendChild(banner);
  }
  
  // Mostrar banner de éxito
  private mostrarBannerExito(): void {
    const banner = document.getElementById('banner-carga-datos');
    if (banner) {
      banner.innerHTML = `
        <div style="
          position: fixed; 
          top: 0; 
          left: 0; 
          right: 0; 
          background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
          color: white; 
          padding: 20px; 
          text-align: center; 
          z-index: 10000;
          font-family: Arial, sans-serif;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        ">
          <h2 style="margin: 0 0 10px 0; font-size: 24px;">✅ ¡Datos de Prueba Cargados Exitosamente!</h2>
          <p style="margin: 0; font-size: 16px;">Sistema listo para pruebas. La página se recargará automáticamente...</p>
        </div>
      `;
    }
  }
  
  // Mostrar banner de error
  private mostrarBannerError(): void {
    const banner = document.getElementById('banner-carga-datos');
    if (banner) {
      banner.innerHTML = `
        <div style="
          position: fixed; 
          top: 0; 
          left: 0; 
          right: 0; 
          background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
          color: white; 
          padding: 20px; 
          text-align: center; 
          z-index: 10000;
          font-family: Arial, sans-serif;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        ">
          <h2 style="margin: 0 0 10px 0; font-size: 24px;">❌ Error al Cargar Datos</h2>
          <p style="margin: 0; font-size: 16px;">Hubo un problema al cargar los datos de prueba. Revisa la consola para más detalles.</p>
          <button onclick="document.getElementById('banner-carga-datos').remove()" style="
            margin-top: 10px; 
            padding: 8px 16px; 
            background: white; 
            color: #ff416c; 
            border: none; 
            border-radius: 4px; 
            cursor: pointer;
          ">Cerrar</button>
        </div>
      `;
    }
  }
  
  // Ocultar banner de carga
  private ocultarBannerCarga(): void {
    const banner = document.getElementById('banner-carga-datos');
    if (banner) {
      banner.remove();
    }
  }
  
  // Método para limpiar todos los datos
  limpiarTodosDatos(): void {
    console.log("🗑️ Iniciando limpieza de todos los datos...");
    
    const db = new Cl_dcytDb({ aliasCuenta: "TERANEXUS CORE" });
    
    // Limpiar localStorage
    localStorage.clear();
    console.log("✅ localStorage limpiado");
    
    // Eliminar todas las puntuaciones
    db.listRecords({ 
      tabla: "Puntuacion", 
      callback: ({ objects, error }: any) => {
        if (!error && objects && objects.length > 0) {
          console.log(`🗑️ Eliminando ${objects.length} puntuaciones...`);
          objects.forEach((p: any) => {
            db.deleteRecord({
              tabla: "Puntuacion",
              object: p,
              callback: () => {}
            });
          });
          console.log("✅ Puntuaciones eliminadas");
        } else {
          console.log("ℹ️ No hay puntuaciones para eliminar");
        }
      }
    });
    
    // Eliminar todos los jurados
    db.listRecords({ 
      tabla: "Jurado", 
      callback: ({ objects, error }: any) => {
        if (!error && objects && objects.length > 0) {
          console.log(`🗑️ Eliminando ${objects.length} jurados...`);
          objects.forEach((j: any) => {
            db.deleteRecord({
              tabla: "Jurado",
              object: j,
              callback: () => {}
            });
          });
          console.log("✅ Jurados eliminados");
        } else {
          console.log("ℹ️ No hay jurados para eliminar");
        }
        
        console.log("🔄 Recarga la página (F5) para ver los cambios");
        alert("Datos eliminados. Recarga la página (F5).");
      }
    });
  }
}