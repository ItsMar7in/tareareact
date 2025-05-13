import React, { useState } from 'react';

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [lista, setLista] = useState([]);
  const [edicion, setEdicion] = useState(false);
  const [editar, setEditar] = useState(null);

  const registrar = (e) => {
    e.preventDefault();

    if (!nombre.trim()) return alert('Falta el nombre');
    if (!apellido.trim()) return alert('Falta el apellido');

    if (edicion) {
      const nuevaLista = [...lista];
      nuevaLista[editar] = { nombre, apellido };
      setLista(nuevaLista);
      setEdicion(false);
      setEditar(null);
    } else {
      setLista([...lista, { nombre, apellido }]);
    }

    setNombre('');
    setApellido('');
  };

  const eliminarUsuario = (index) => {
    const nuevaLista = lista.filter((_, i) => i !== index);
    setLista(nuevaLista);
  };

  const editarUsuario = (index) => {
    const usuario = lista[index];
    setNombre(usuario.nombre);
    setApellido(usuario.apellido);
    setEdicion(true);
    setEditar(index);
  };

  return (
    <div className="container mt-4">
      <h2>Registro de usuarios</h2>
      <form onSubmit={registrar}>
        <input
          type="text"
          placeholder="Ingrese su nombre"
          className="form-control mb-3"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingrese su apellido"
          className="form-control mb-3"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">
            {edicion ? 'Actualizar' : 'Registrar'}
          </button>
        </div>
      </form>

      <h2 className="mt-4">Usuarios Registrados</h2>
      <ul className="list-group">
        {lista.map((user, index) => (
          <li className="list-group-item" key={index}>
            {user.nombre} - {user.apellido}
            <button
              className="btn btn-danger float-end mx-2"
              onClick={() => eliminarUsuario(index)}
            >
              Eliminar
            </button>
            <button
              className="btn btn-warning float-end mx-2"
              onClick={() => editarUsuario(index)}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Formulario;
