package com.tareas.modelos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TareasModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombreTareas;
    private String fechaLimite;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "persona_id")
    private Persona persona;
    private Boolean completada;

    public void actualizarTareaModel(TareasModel t){
        if(t.nombreTareas != null) this.nombreTareas = t.fechaLimite;
        if(t.fechaLimite != null) this.fechaLimite = t.fechaLimite;
        if(t.persona != null) this.persona = t.persona;
    }

}
