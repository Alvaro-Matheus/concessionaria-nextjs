"use client";

import { Form, Row, Col } from "react-bootstrap";
import styles from "../admin.module.css";

export default function CarForm({
  values,
  handleChange,
  setFieldValue,
  errors,
  touched,
}) {
  return (
    <div className={styles.formGrid}>

      <div className={styles.section}>

        <h3 className={styles.sectionTitle}>
          Informações do Veículo
        </h3>

        <Row>
          <Col md={6}>
            <Form.Group className={styles.formGroup}>

              <Form.Label className={styles.label}>
                Nome
              </Form.Label>

              <Form.Control
                type="text"
                name="nome"
                placeholder="Ex: BMW M4 Competition"
                value={values.nome}
                onChange={handleChange}
                className={styles.input}
                required
                isInvalid={touched.nome && errors.nome}
              />

              <Form.Control.Feedback type="invalid">
                {errors.nome}
              </Form.Control.Feedback>

            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className={styles.formGroup}>

              <Form.Label className={styles.label}>
                Marca
              </Form.Label>

              <Form.Control
                type="text"
                name="marca"
                placeholder="Ex: BMW"
                value={values.marca}
                onChange={handleChange}
                className={styles.input}
                required
                isInvalid={touched.marca && errors.marca}
              />

              <Form.Control.Feedback type="invalid">
                {errors.marca}
              </Form.Control.Feedback>

            </Form.Group>
          </Col>

        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className={styles.formGroup}>

              <Form.Label className={styles.label}>
                Carroceria
              </Form.Label>

              <Form.Control
                type="text"
                name="modelo"
                placeholder="Ex: Hatch"
                value={values.modelo}
                onChange={handleChange}
                className={styles.input}
                required
                isInvalid={touched.modelo && errors.modelo}
              />

              <Form.Control.Feedback type="invalid">
                {errors.modelo}
              </Form.Control.Feedback>

            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className={styles.formGroup}>

              <Form.Label className={styles.label}>
                Ano
              </Form.Label>

              <Form.Control
                type="number"
                name="ano"
                placeholder="Ex: 2024"
                value={values.ano}
                onChange={handleChange}
                className={styles.input}
                required
                isInvalid={touched.ano && errors.ano}
              />

              <Form.Control.Feedback type="invalid">
                {errors.ano}
              </Form.Control.Feedback>

            </Form.Group>
          </Col>

        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className={styles.formGroup}>

              <Form.Label className={styles.label}>
                Valor
              </Form.Label>

              <Form.Control
                type="number"
                name="valor"
                placeholder="Ex: 350000"
                value={values.valor}
                onChange={handleChange}
                className={styles.input}
                required
                isInvalid={touched.valor && errors.valor}
              />

              <Form.Control.Feedback type="invalid">
                {errors.valor}
              </Form.Control.Feedback>

            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className={styles.formGroup}>

              <Form.Label className={styles.label}>
                KM
              </Form.Label>

              <Form.Control
                type="text"
                name="km"
                placeholder="Ex: 12.000"
                value={values.km}
                onChange={handleChange}
                className={styles.input}
                required
                isInvalid={touched.km && errors.km}
              />

              <Form.Control.Feedback type="invalid">
                {errors.km}
              </Form.Control.Feedback>

            </Form.Group>
          </Col>

        </Row>

      </div>

      <div className={styles.section}>

        <h3 className={styles.sectionTitle}>
          Especificações
        </h3>

        <Row>

          <Col md={4}>
            <Form.Group className={styles.formGroup}>

              <Form.Label className={styles.label}>
                Motor
              </Form.Label>

              <Form.Control
                type="text"
                name="motor"
                placeholder="Ex: 3.0 Turbo"
                value={values.motor}
                onChange={handleChange}
                className={styles.input}
                required
                isInvalid={touched.motor && errors.motor}
              />

              <Form.Control.Feedback type="invalid">
                {errors.motor}
              </Form.Control.Feedback>

            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className={styles.formGroup}>

              <Form.Label className={styles.label}>
                Câmbio
              </Form.Label>

              <Form.Control
                type="text"
                name="cambio"
                placeholder="Ex: Automático"
                value={values.cambio}
                onChange={handleChange}
                className={styles.input}
                required
                isInvalid={touched.cambio && errors.cambio}
              />

              <Form.Control.Feedback type="invalid">
                {errors.cambio}
              </Form.Control.Feedback>

            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className={styles.formGroup}>

              <Form.Label className={styles.label}>
                Combustível
              </Form.Label>

              <Form.Control
                type="text"
                name="combustivel"
                placeholder="Ex: Gasolina"
                value={values.combustivel}
                onChange={handleChange}
                className={styles.input}
                required
                isInvalid={touched.combustivel && errors.combustivel}
              />

              <Form.Control.Feedback type="invalid">
                {errors.combustivel}
              </Form.Control.Feedback>

            </Form.Group>
          </Col>

        </Row>

        {/* COR */}
        <Form.Group className={styles.formGroup}>

          <Form.Label className={styles.label}>
            Cor
          </Form.Label>

          <Form.Control
            type="text"
            name="cor"
            placeholder="Ex: Preto"
            value={values.cor}
            onChange={handleChange}
            className={styles.input}
            required
            isInvalid={touched.cor && errors.cor}
          />

          <Form.Control.Feedback type="invalid">
            {errors.cor}
          </Form.Control.Feedback>

        </Form.Group>

      </div>

      <div className={styles.section}>

        <h3 className={styles.sectionTitle}>
          Imagens do Veículo
        </h3>

        <div className={styles.fileRow}>
          <Form.Group className={styles.formGroup}>

            <Form.Label className={styles.label}>
              Imagem 1
            </Form.Label>

            <Form.Control
              type="file"
              accept="image/*"
              className={styles.fileInput}
              required
              onChange={(e) =>
                setFieldValue(
                  "imagem1",
                  e.target.files?.[0]
                )
              }
              isInvalid={touched.imagem1 && errors.imagem1}
            />

            <Form.Control.Feedback type="invalid">
              {errors.imagem1}
            </Form.Control.Feedback>

          </Form.Group>
          <Form.Group className={styles.formGroup}>

            <Form.Label className={styles.label}>
              Imagem 2
            </Form.Label>

            <Form.Control
              type="file"
              accept="image/*"
              className={styles.fileInput}
              required
              onChange={(e) =>
                setFieldValue(
                  "imagem2",
                  e.target.files?.[0]
                )
              }
              isInvalid={touched.imagem2 && errors.imagem2}
            />

            <Form.Control.Feedback type="invalid">
              {errors.imagem2}
            </Form.Control.Feedback>

          </Form.Group>
          <Form.Group className={styles.formGroup}>

            <Form.Label className={styles.label}>
              Imagem 3
            </Form.Label>

            <Form.Control
              type="file"
              accept="image/*"
              className={styles.fileInput}
              required
              onChange={(e) =>
                setFieldValue(
                  "imagem3",
                  e.target.files?.[0]
                )
              }
              isInvalid={touched.imagem3 && errors.imagem3}
            />

            <Form.Control.Feedback type="invalid">
              {errors.imagem3}
            </Form.Control.Feedback>

          </Form.Group>

        </div>

      </div>

    </div>
  );
}