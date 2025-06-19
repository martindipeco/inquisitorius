package com.inquisitorius.skillslink.repository;


import com.inquisitorius.skillslink.domain.mentoria.Mentoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MentoriaRepository extends JpaRepository<Mentoria, Long> {
}