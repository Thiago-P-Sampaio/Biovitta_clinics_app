# BioVitta - Sistema de Gerenciamento Clínico

## Visão Geral do Projeto

O BioVitta é um aplicativo móvel desenvolvido em ***React Native***, projetado para otimizar a gestão de clínicas e consultórios médicos. Ele oferece funcionalidades para o gerenciamento de pacientes, médicos, consultas e relatórios, com controle de acesso baseado em perfis de usuário (Admin, Médico e Paciente).

## Funcionalidades Principais

* **Autenticação de Usuários**: Sistema de login e registro para diferentes perfis de usuário.
* **Controle de Acesso por Perfil**:
    * **Admin**: Acesso total a todas as funcionalidades (gerenciamento de médicos, pacientes, consultas, relatórios).
    * **Médico**: Acesso a pacientes, suas próprias consultas e relatórios.
    * **Paciente**: Acesso para visualizar seus próprios dados, médicos e agendar/consultar suas consultas.
* **Gestão de Pacientes**:
    * Listagem e pesquisa de pacientes.
    * Visualização detalhada de informações do paciente.
    * Adição, edição e exclusão de pacientes (funcionalidades específicas para Admin).
* **Gestão de Médicos**:
    * Listagem e pesquisa de médicos.
    * Visualização detalhada de informações do médico.
    * Adição, edição e exclusão de médicos (funcionalidades específicas para Admin).
* **Gestão de Consultas**:
    * Listagem de consultas com filtragem por perfil.
    * Agendamento, edição e exclusão de consultas.
    * Seleção de data e hora via `DateTimePicker`.
* **Relatórios**:
    * Geração e download de relatórios de consultas em formato PDF (acesso exclusivo para Admin e Médico).
    * Funcionalidade de download compatível com Android e iOS.
* **Navegação Intuitiva**: Utiliza `Drawer Navigator` para navegação principal e `Stack Navigators` para telas internas.

## Tecnologias Utilizadas

* **React Native**: Framework para construção de aplicativos móveis.
* **Expo**: Conjunto de ferramentas para desenvolver, construir e implantar aplicativos React Native.
* **React Navigation**: Solução de navegação para aplicativos React Native.
* **Axios**: Cliente HTTP para fazer requisições à API.
* **Formik** e **Yup**: Para gerenciamento de formulários e validação de esquemas.
* **@react-native-picker/picker**: Componente de seleção para formulários.
* **@react-native-community/datetimepicker**: Componente de seleção de data e hora.
* **react-native-vector-icons**: Biblioteca de ícones.
* **expo-file-system**: Para gerenciamento de sistema de arquivos (download de relatórios).
* **expo-intent-launcher** e **expo-web-browser**: Para abrir arquivos no dispositivo (relatórios).
* **AsyncStorage**: Para persistência de dados (token de autenticação).
* **JWT Decode**: Para decodificar tokens JWT no cliente.

## Estrutura do Projeto
A pasta `src` está organizada da seguinte forma:
```
src/
├── components/
├── context/
├── features/
│   ├── Auth/
│   ├── Consultas/
│   ├── Medicos/
│   ├── Pacientes/
│   └── Relatorios/
├── navigation/
├── pages/
├── services/
└── styles/
...
```

## Como Executar o Projeto

### Pré-requisitos

* Node.js e npm (ou Yarn)
* Expo CLI (`npm install -g expo-cli`)
* Um emulador de Android/iOS ou um dispositivo físico.
* **Backend em Execução**: Este aplicativo depende de um serviço de backend para funcionar. Clone o repostiório do [BACK-END](https://github.com/Thiago-P-Sampaio/Biovitta_clinics_backend.git), e certifique-se de rodar na base: `http://<SEU_IP_LOCAL>:8080/biovitta`
### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/Thiago-P-Sampaio/Biovitta_clinics_app.git

    cd biovitta-clinics-app
    ```
2.  Instale as dependências:
    ```bash
    npm install
    # ou yarn install
    ```
3.  Inicie o servidor de desenvolvimento Expo:
    ```bash
    expo start
    # ou npm start
    ```
4.  Scaneie o QR Code com o aplicativo Expo Go no seu dispositivo móvel ou selecione uma opção para abrir em um emulador.

---

 <table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/Thiago-P-Sampaio/Biovitta_clinics_backend.git">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" width="100px;" alt="Foto"/><br>
        <sub>
          <b>Repositório Back-end</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Thiago-P-Sampaio/Biovitta_clinics_frontend.git">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="100px;" alt="Foto"/><br>
        <sub>
          <b>Repositório Front-End</b>
        </sub>
      </a>
    </td>
    </tr>
    </table>