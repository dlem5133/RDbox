package com.univr.rdbox.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.univr.rdbox.model.*;

@Repository
public interface UserDao extends JpaRepository<User, Object> {
    public User findByKakaoid(String id);
}
