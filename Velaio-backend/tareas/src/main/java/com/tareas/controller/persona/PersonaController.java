package com.tareas.controller.persona;

import com.tareas.modelos.Persona;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/persona")
@CrossOrigin(origins = "http://localhost:4200/")
public class PersonaController {

    @Autowired
    private PersonaRepository personaRepository;

    @GetMapping()
    public ResponseEntity<List<Persona>> todasLasTareas(){
        List<Persona> persona = personaRepository.findAll();
        return ResponseEntity.ok(persona);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Persona>> detallesTarea(@PathVariable Long id){
        Optional<Persona> tarea = personaRepository.findById(id);
        return ResponseEntity.ok(tarea);
    }

    @PostMapping()
    @Transactional
    public ResponseEntity<Persona> crearTarea(@RequestBody Persona persona){
        Persona p = personaRepository.save(persona);
        return ResponseEntity.ok(p);
    }

    @DeleteMapping("/{id}" )
    public ResponseEntity<String> eliminarTarea(@PathVariable Long id){
        personaRepository.deleteById(id);
        var message = "Usuario Eliminado";
        return ResponseEntity.ok(message);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Persona> actualizarTarea(@PathVariable Long id, @RequestBody Persona tm){
        var t = personaRepository.findById(id);
        if(t.isPresent()){
            Persona n = t.get();
            n.setNombre(tm.getNombre());
            n.setEdad(tm.getEdad());
            n.setHabilidades(tm.getHabilidades());
            personaRepository.save(n);
            return ResponseEntity.ok(n);
        } else {
            return ResponseEntity.notFound().build();
        }
    }






}
