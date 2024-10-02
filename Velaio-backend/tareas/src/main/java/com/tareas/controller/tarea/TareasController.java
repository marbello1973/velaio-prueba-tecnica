package com.tareas.controller.tarea;

import com.tareas.controller.persona.PersonaRepository;
import com.tareas.modelos.Persona;
import com.tareas.modelos.TareasModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tareas")
@CrossOrigin(origins = "http://localhost:4200/")
public class TareasController {

    @Autowired
    private TareasRepository tareaRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @GetMapping()
    public ResponseEntity<List<TareasModel>> todasLasTareas(){
        List<TareasModel> tareas = tareaRepository.findAll();
        return ResponseEntity.ok(tareas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<TareasModel>> detallesTarea(@PathVariable Long id){
        Optional<TareasModel> tarea = tareaRepository.findById(id);
        return ResponseEntity.ok(tarea);
    }

    @PostMapping()
    @Transactional
    public ResponseEntity<TareasModel> crearTarea(@RequestBody TareasModel tareasModel){
        TareasModel tareas = tareaRepository.save(tareasModel);
        return ResponseEntity.ok(tareas);
    }

    @DeleteMapping("/{id}" )
    public ResponseEntity<String> eliminarTarea(@PathVariable Long id){
        tareaRepository.deleteById(id);
        var message = "Tarea eliminada";
        return ResponseEntity.ok(message);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<TareasModel> actualizarTarea(@PathVariable Long id, @RequestBody TareasModel tm){
       /* var t = tareaRepository.findById(id);
        if(t.isPresent()){
            TareasModel n = t.get();
            n.actualizarTareaModel(tm);
            tareaRepository.save(n);
            return ResponseEntity.ok(n);
        } else {
            return ResponseEntity.notFound().build();
        }*/
        var t = tareaRepository.findById(id);
        if(t.isPresent()){
            TareasModel n = t.get();
            n.setNombreTareas(tm.getNombreTareas());
            n.setFechaLimite(tm.getFechaLimite());
            n.setPersona(tm.getPersona());
            tareaRepository.save(n);
            return ResponseEntity.ok(n);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}