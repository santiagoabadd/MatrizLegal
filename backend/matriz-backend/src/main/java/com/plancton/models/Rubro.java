package com.plancton.models;


import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="rubro")
public class Rubro {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="rubro_id")
    private Integer rubroId;
    @Column(name = "rubro",length = 60,nullable = false)
    private String rubro;



    public Rubro(){}
    public Rubro(Integer rubroId, String rubro) {
        this.rubroId = rubroId;
        this.rubro = rubro;
    }





    public Integer getRubroId() {
        return rubroId;
    }

    public void setRubroId(Integer rubroId) {
        this.rubroId = rubroId;
    }

    public String getRubro() {
        return rubro;
    }

    public void setRubro(String rubro) {
        this.rubro = rubro;
    }
}
