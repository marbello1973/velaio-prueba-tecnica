package com.tareas.controller.tarea;


import com.tareas.modelos.TareasModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TareasRepository extends JpaRepository<TareasModel, Long> {
}
