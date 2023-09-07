package com.plancton.services;

import java.util.List;

public interface GenericService<T> {
    
    public abstract boolean add(T object);

    public abstract List<T> getAll();

    public abstract T getById(long id);

    public abstract T modify(T object);

    public abstract boolean delete(long id);

}
