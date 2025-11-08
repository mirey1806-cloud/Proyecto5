<template>
  <div class="Home">
    <!-- Campo para agregar nueva tarea -->
    <v-text-field
      v-model="nuevoTituloTarea"
      @click:append="agregarTarea"
      @keyup.enter="agregarTarea"
      class="pa-3"
      outlined
      label="Nueva tarea"
      append-icon="mdi-plus"
      hide-details
      clearable
    ></v-text-field>

    <!-- Lista de tareas -->
    <v-list flat>
      <div v-for="tarea in tareas" :key="tarea.id">
        <v-list-item :class="{ 'blue lighten-5': tarea.hecho }">
          <v-list-item-action>
            <v-checkbox
              v-model="tarea.hecho"
              @change="TareaHecho(tarea.id, tarea.hecho)"
              color="primary"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <!-- Campo de edición -->
            <div v-if="tarea.id === tareaAEditar?.id">
              <v-text-field
                v-model="nuevoTituloEditado"
                dense
                solo
                hide-details
                @keyup.enter="guardarEdicion()"
                @blur="cancelarEdicion()"
              ></v-text-field>
            </div>

            <!-- Texto de tarea -->
            <div v-else @click="iniciarEdicion(tarea)">
              <v-list-item-title
                :class="{ 'text-decoration-line-through': tarea.hecho }"
              >
                {{ tarea.titulo }}
              </v-list-item-title>
            </div>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click.stop="BorrarTarea(tarea.id)">
              <v-icon color="red lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </div>
    </v-list>
  </div>
</template>

<script>
// 🔹 Importar Firebase y Firestore
import { db } from '@/plugins/firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";

export default {
  name: 'Home',
  data() {
    return {
      nuevoTituloTarea: '',
      tareas: [],
      tareaAEditar: null,
      nuevoTituloEditado: ''
    }
  },
  mounted() {
    this.obtenerTareas();
  },
  methods: {
    // 🔹 Leer tareas en tiempo real desde Firestore
    obtenerTareas() {
      const q = query(collection(db, "tareas"), orderBy("creadoEn", "desc"));
      onSnapshot(q, (snapshot) => {
        this.tareas = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      });
    },

    // 🔹 Crear tarea
    async agregarTarea() {
      if (!this.nuevoTituloTarea.trim()) return;
      await addDoc(collection(db, "tareas"), {
        titulo: this.nuevoTituloTarea,
        hecho: false,
        creadoEn: serverTimestamp()
      });
      this.nuevoTituloTarea = '';
    },

    // 🔹 Actualizar estado "hecho"
    async TareaHecho(id, hecho) {
      const tareaRef = doc(db, "tareas", id);
      await updateDoc(tareaRef, { hecho });
    },

    // 🔹 Eliminar tarea
    async BorrarTarea(id) {
      if (confirm('¿Deseas eliminar la tarea?')) {
        const tareaRef = doc(db, "tareas", id);
        await deleteDoc(tareaRef);
      }
    },

    // 🔹 Editar título
    iniciarEdicion(tarea) {
      this.tareaAEditar = tarea;
      this.nuevoTituloEditado = tarea.titulo;
    },

    cancelarEdicion() {
      this.tareaAEditar = null;
      this.nuevoTituloEditado = '';
    },

    async guardarEdicion() {
      if (!this.nuevoTituloEditado.trim()) return;
      const tareaRef = doc(db, "tareas", this.tareaAEditar.id);
      await updateDoc(tareaRef, { titulo: this.nuevoTituloEditado });
      this.cancelarEdicion();
    }
  }
};
</script>
