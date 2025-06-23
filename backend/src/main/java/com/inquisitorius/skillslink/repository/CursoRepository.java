package com.inquisitorius.skillslink.repository;

import com.inquisitorius.skillslink.domain.cursos.Curso;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CursoRepository extends JpaRepository<Curso, Long> {
}