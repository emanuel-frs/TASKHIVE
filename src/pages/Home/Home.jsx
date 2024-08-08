import { useContext, useState } from 'react';
import Modal from 'react-modal';
import styles from './home.module.css';
import dark from './dark.module.css';
import { ContrastContext } from '../../context/ContrastContext';
import HeaderDefault from '../../components/HeaderDefault/HeaderDefault';
import { FiSearch } from 'react-icons/fi';
import { LuPlusCircle } from 'react-icons/lu';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { IoCloseOutline } from 'react-icons/io5';
import tema1 from '../../assets/temas/tema1.jpg';
import tema2 from '../../assets/temas/tema2.jpg';
import tema3 from '../../assets/temas/tema3.jpg';
import tema4 from '../../assets/temas/tema4.jpg';
import tema5 from '../../assets/temas/tema5.jpg';
import tema6 from '../../assets/temas/tema6.jpg';
import tema7 from '../../assets/temas/tema7.jpg';
import tema8 from '../../assets/temas/tema8.jpg';

Modal.setAppElement('#root');

export default function Home() {
    const contrastContext = useContext(ContrastContext);
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ name: '', description: '', image: '' });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
    const [imageSelected, setImageSelected] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(null);

    if (!contrastContext) {
        return null;
    }

    const { isHighContrast } = contrastContext;

    const handleImageSelect = (imageUrl) => {
        setNewProject({ ...newProject, image: imageUrl });
        setImageSelected(true);
        setImageModalIsOpen(false);
    };

    const handleSubmit = () => {
        if (editMode) {
            const updatedProjects = projects.map((project, index) => 
                index === currentProjectIndex ? newProject : project
            );
            setProjects(updatedProjects);
        } else {
            setProjects([...projects, newProject]);
        }
        resetModalState();
    };

    const handleDelete = (index) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setProjects(updatedProjects);
    };

    const handleEdit = (index) => {
        setCurrentProjectIndex(index);
        setNewProject(projects[index]);
        setEditMode(true);
        setImageSelected(!!projects[index].image);
        setModalIsOpen(true);
    };

    const resetModalState = () => {
        setNewProject({ name: '', description: '', image: '' });
        setImageSelected(false);
        setModalIsOpen(false);
        setEditMode(false);
        setCurrentProjectIndex(null);
    };

    const truncateDescription = (description, length) => {
        return description.length > length
            ? description.substring(0, length) + '...'
            : description;
    };    

    return (
        <>
            <div className={`${styles.mainContaint} ${isHighContrast ? dark.mainContaint : ''}`}>
                <HeaderDefault />
                <div className={styles.barra}>
                    <div className={`${styles.search} ${isHighContrast ? dark.search : ''}`}>
                        <div className={`${styles.searchIcon} ${isHighContrast ? dark.searchIcon : ''}`}>
                            {isHighContrast ? (
                                <FiSearch size={25} style={{ color: '#061826', cursor: 'pointer' }} />
                            ) : (
                                <FiSearch size={25} style={{ color: '#E6D6C1', cursor: 'pointer' }} />
                            )}
                        </div>
                        <input
                            type="text"
                            placeholder="Search your project"
                            className={`${styles.input} ${isHighContrast ? dark.input : ''}`}
                        />
                    </div>
                    <div className={`${styles.create} ${isHighContrast ? dark.create : ''}`} onClick={() => setModalIsOpen(true)} >
                        <LuPlusCircle size={25}/>
                        <span className={`${styles.spanCreate} ${isHighContrast ? dark.spanCreate : ''}`}>
                            Create New Project
                        </span>
                        <LuPlusCircle size={25} style={{ opacity : 0 }}/>
                    </div>
                </div>
                <div className={`${styles.container} ${isHighContrast ? dark.container : ''}`}>
                    <div className={`${styles.cards} ${isHighContrast ? dark.cards : ''}`}>
                    {projects.map((project, index) => (
                        <div key={index} className={`${styles.projectCard} ${isHighContrast ? dark.projectCard : ''}`}>
                            {project.image && <img src={project.image} alt="Project" className={styles.imagem}/>}
                            <div className={`${styles.textos} ${isHighContrast ? dark.textos : ''}`}>
                                <h2 className={styles.titulo}>{truncateDescription(project.name, 10)}</h2>
                                <p className={`${styles.descricao} ${isHighContrast ? dark.descricao : ''}`}>{truncateDescription(project.description, 50)}</p>
                            </div>
                            <div className={`${styles.configs} ${isHighContrast ? dark.configs : ''}`}>
                                <RiEdit2Fill size={25} color={isHighContrast ? '#E6D6C1' : '#061826'} onClick={() => handleEdit(index)} style={{ cursor : 'pointer'}}/>
                                <RiDeleteBin6Fill size={25} color='#98092B' onClick={() => handleDelete(index)} style={{ cursor : 'pointer'}}/>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                <Modal
                isOpen={modalIsOpen}
                onRequestClose={resetModalState}
                className={`${styles.modal} ${isHighContrast ? dark.modal : ''}`}
                overlayClassName={styles.overlay}>
                    <IoCloseOutline onClick={resetModalState} className={`${styles.closeButton} ${isHighContrast ? dark.closeButton : ''}`} size={20}/>
                    <h2>{editMode ? 'Edit Project' : 'Create New Project'}</h2>
                    <input
                        type="text"
                        placeholder="Project Name"
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        className={`${styles.inputs} ${isHighContrast ? dark.inputs : ''}`}
                    />
                    <textarea
                        placeholder="Project Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className={`${styles.inputs} ${isHighContrast ? dark.inputs : ''}`}
                    />
                    <button
                        className={`${imageSelected ? styles.imageSelected : styles.imagePickerButton}`}
                        onClick={() => setImageModalIsOpen(true)}
                    >
                        {imageSelected ? 'Image Selected' : 'Select Image'}
                    </button>
                    <button onClick={handleSubmit} className={styles.createModal}>
                        {editMode ? 'Save Changes' : 'Create Project'}
                    </button>
                </Modal>

                <Modal
                isOpen={imageModalIsOpen}
                onRequestClose={() => setImageModalIsOpen(false)}
                className={`${styles.modal} ${isHighContrast ? dark.modal : ''}`}
                overlayClassName={styles.overlay}>
                    <IoCloseOutline onClick={() => setImageModalIsOpen(false)} className={styles.closeButton} size={20}/>
                    <h2>Select an Image</h2>
                    <div className={styles.imageGallery}>
                        {[tema1, tema2, tema3, tema4, tema5, tema6, tema7, tema8
                        ]
                        .map((imageUrl, index) => (
                            <img
                                key={index}
                                src={imageUrl}
                                alt={`Option ${index + 1}`}
                                className={styles.imageOption}
                                onClick={() => handleImageSelect(imageUrl)}
                            />
                        ))}
                    </div>
                </Modal>
            </div>
        </>
    );
}
