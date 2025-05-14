import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CreateGLDocument from './CreateGeneralLedger'; // Reuse with props
import { useNavigate } from 'react-router-dom';
const EditGLDocument = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_SERVER_URL}/api/v1/gldocuments/${id}`)
      .then((res) => setForm(res.data));
  }, [id]);

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1/gldocuments/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/accounting/gldocuments');
    } catch (err) {
      console.error('Error updating document:', err);
    }
  };

  return form ? (
    <CreateGLDocument
      form={form}
      setForm={setForm}
      handleSubmit={handleSubmit}
    />
  ) : (
    <div>Loading...</div>
  );
};

export default EditGLDocument;
