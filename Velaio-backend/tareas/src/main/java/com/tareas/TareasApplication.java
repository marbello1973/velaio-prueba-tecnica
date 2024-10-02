package com.tareas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class TareasApplication {

	public static void main(String[] args) {
		SpringApplication.run(TareasApplication.class, args);
	}

	/*@Override
	public void run(String... args) throws Exception {
		System.out.println("Line de comandos");
		TareasModel model = new TareasModel();
		TareasController tarea = new TareasController();
		var tar = tarea.actualizarTarea(1L,  model);
		System.out.println("Actualizar: -> " + tar);

	}*/
}
