import { useState, useContext, useRef } from 'react';
import styles from './projects.module.css';
import dark from './dark.module.css';
import { ContrastContext } from '../../context/ContrastContext';
import HeaderDefault from '../../components/HeaderDefault/HeaderDefault'; 
import { GoPlus } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";

export default function Projects() {
    const contrastContext = useContext(ContrastContext);
    const [tables, setTables] = useState([]);
    const [editingTable, setEditingTable] = useState(null);
    const [editingCard, setEditingCard] = useState({ tableId: null, cardId: null });
    const [tempName, setTempName] = useState('');
    const [draggedItem, setDraggedItem] = useState(null);
    const [draggedFromTable, setDraggedFromTable] = useState(null);
    const [isAddingTable, setIsAddingTable] = useState(false);
    const [newTableName, setNewTableName] = useState('');
    const [newCardData, setNewCardData] = useState({ tableId: null, name: '' });
    const [showCardOptions, setShowCardOptions] = useState({ tableId: null, cardId: null });
    const [selectedOption, setSelectedOption] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    const cardRefs = useRef({});

    if (!contrastContext) {
        return null;
    }

    const { isHighContrast } = contrastContext;

    const addTable = () => {
        setIsAddingTable(true);
    };

    const saveTable = () => {
        if (newTableName.trim() === '') {
            alert('Table name is required!');
            return;
        }

        setTables([...tables, { id: Date.now(), name: newTableName, cards: [] }]);
        setNewTableName('');
        setIsAddingTable(false);
    };

    const cancelAddTable = () => {
        setNewTableName('');
        setIsAddingTable(false);
    };

    const addCard = (tableId) => {
        setNewCardData({ tableId, name: '' });
    };

    const saveCard = () => {
        if (newCardData.name.trim() === '') {
            alert('Card name is required!');
            return;
        }

        const newTables = tables.map(table =>
            table.id === newCardData.tableId
                ? {
                    ...table,
                    cards: [...table.cards, { id: Date.now(), name: newCardData.name, tagColor: null }],
                }
                : table
        );
        setTables(newTables);
        setNewCardData({ tableId: null, name: '' });
    };

    const cancelAddCard = () => {
        setNewCardData({ tableId: null, name: '' });
    };

    const deleteTable = (tableId) => {
        setTables(tables.filter(table => table.id !== tableId));
    };

    const deleteCard = (tableId, cardId) => {
        setTables(tables.map(table =>
            table.id === tableId
                ? { ...table, cards: table.cards.filter(card => card.id !== cardId) }
                : table
        ));
        setShowCardOptions({ tableId: null, cardId: null });
        setIsModalOpen(false);
    };

    const handleDragStart = (event, tableId, cardId) => {
        event.dataTransfer.effectAllowed = 'move';
        setDraggedItem(cardId);
        setDraggedFromTable(tableId);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (event, tableId) => {
        event.preventDefault();

        if (draggedItem !== null && draggedFromTable !== null) {
            let newTables = [...tables];
            let movedCard = null;

            newTables = newTables.map(table => {
                if (table.id === draggedFromTable) {
                    const cards = [...table.cards];
                    const cardIndex = cards.findIndex(card => card.id === draggedItem);
                    if (cardIndex >= 0) {
                        [movedCard] = cards.splice(cardIndex, 1);
                        return { ...table, cards };
                    }
                }
                return table;
            });

            if (movedCard) {
                newTables = newTables.map(table =>
                    table.id === tableId
                        ? { ...table, cards: [...table.cards, movedCard] }
                        : table
                );
            }

            setTables(newTables);
            setDraggedItem(null);
            setDraggedFromTable(null);
        }
    };

    const handleEditTable = (tableId) => {
        setEditingTable(tableId);
        const table = tables.find(t => t.id === tableId);
        if (table) {
            setTempName(table.name);
        }
    };

    const handleEditCard = (tableId, cardId) => {
        setEditingCard({ tableId, cardId });
        const table = tables.find(t => t.id === tableId);
        if (table) {
            const card = table.cards.find(c => c.id === cardId);
            if (card) {
                setTempName(card.name);
            }
        }
    };

    const handleSaveEdit = () => {
        if (editingTable !== null) {
            setTables(tables.map(table =>
                table.id === editingTable ? { ...table, name: tempName } : table
            ));
            setEditingTable(null);
        } else if (editingCard.tableId !== null && editingCard.cardId !== null) {
            setTables(tables.map(table =>
                table.id === editingCard.tableId
                    ? {
                        ...table,
                        cards: table.cards.map(card =>
                            card.id === editingCard.cardId ? { ...card, name: tempName } : card
                        ),
                    }
                    : table
            ));
            setEditingCard({ tableId: null, cardId: null });
        }
        setTempName('');
    };

    const handleCancelEdit = () => {
        setEditingTable(null);
        setEditingCard({ tableId: null, cardId: null });
        setTempName('');
    };

    const handleTagChange = (color) => {
        if (showCardOptions.tableId !== null && showCardOptions.cardId !== null) {
            setTables(tables.map(table =>
                table.id === showCardOptions.tableId
                    ? {
                        ...table,
                        cards: table.cards.map(card =>
                            card.id === showCardOptions.cardId ? { ...card, tagColor: color } : card
                        ),
                    }
                    : table
            ));
        }
        setIsModalOpen(false);
        setSelectedOption(null);
    };

    const handleShowOptions = (tableId, cardId) => {
        setShowCardOptions({ tableId, cardId });
        const cardElement = cardRefs.current[`${tableId}-${cardId}`];
        if (cardElement) {
            const { top, left, height } = cardElement.getBoundingClientRect();
            setModalPosition({ top: top + height + window.scrollY, left: left + window.scrollX });
        }
        setIsModalOpen(true);
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOption(null);
    };

    const removeTag = () => {
        if (showCardOptions.tableId !== null && showCardOptions.cardId !== null) {
            setTables(tables.map(table =>
                table.id === showCardOptions.tableId
                    ? {
                        ...table,
                        cards: table.cards.map(card =>
                            card.id === showCardOptions.cardId ? { ...card, tagColor: null } : card
                        ),
                    }
                    : table
            ));
        }
        setIsModalOpen(false);
        setSelectedOption(null);
    };

    return (
        <div className={`${styles.mainContaint} ${isHighContrast ? dark.mainContaint : ''}`}>
            <HeaderDefault />
            <div className={`${styles.title} ${isHighContrast ? dark.title : ''}`}>
                <div>PROJETO DO PC</div>
            </div>
            <div className={styles.main}>
                <div className={`${styles.tablesContainer} ${isHighContrast ? dark.tablesContainer : ''}`}>
                    <div style={{ display: 'flex' }}>
                        {tables.map((table) => (
                            <div
                                key={table.id}
                                className={`${styles.tableContainer} ${isHighContrast ? dark.tableContainer : ''}`}
                                onDragOver={handleDragOver}
                                onDrop={(event) => handleDrop(event, table.id)}
                            >
                                {editingTable === table.id ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={tempName}
                                            onChange={(e) => setTempName(e.target.value)}
                                            className={`${styles.inputTitle} ${isHighContrast ? dark.inputTitle : ''}`}
                                        />
                                        <button className={`${styles.saveButton} ${isHighContrast ? dark.saveButton : ''}`} onClick={handleSaveEdit}>Save</button>
                                        <button className={`${styles.cancelButton} ${isHighContrast ? dark.cancelButton : ''}`} onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <div className={`${styles.tableHeader} ${isHighContrast ? dark.tableHeader : ''}`}>
                                        <span className={`${styles.tableName} ${isHighContrast ? dark.tableName : ''}`} onClick={() => handleEditTable(table.id)}>
                                            {table.name}
                                        </span>
                                        <IoCloseOutline className={`${styles.deleteIcon} ${isHighContrast ? dark.deleteIcon : ''}`} size={20} onClick={() => deleteTable(table.id)}  color={'#F82525'}/>
                                    </div>
                                )}
                                <div className={`${styles.cardsContainer} ${isHighContrast ? dark.cardsContainer : ''}`}>
                                    {table.cards.map((card) => (
                                        <div
                                            key={card.id}
                                            ref={(el) => (cardRefs.current[`${table.id}-${card.id}`] = el)}
                                            className={`${styles.card} ${isHighContrast ? dark.card : ''}`}
                                            draggable
                                            onDragStart={(event) => handleDragStart(event, table.id, card.id)}
                                        >
                                            {editingCard.tableId === table.id && editingCard.cardId === card.id ? (
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={tempName}
                                                        onChange={(e) => setTempName(e.target.value)}
                                                        className={`${styles.inputName} ${isHighContrast ? dark.inputName : ''}`}
                                                    />
                                                    <button className={`${styles.saveButton} ${isHighContrast ? dark.saveButton : ''}`} onClick={handleSaveEdit}>Save</button>
                                                    <button className={`${styles.cancelButton} ${isHighContrast ? dark.cancelButton : ''}`} onClick={handleCancelEdit}>Cancel</button>
                                                </div>
                                            ) : (
                                                <div className={`${styles.cardHeader} ${isHighContrast ? dark.cardHeader : ''}`}>
                                                    <span className={`${styles.cardName} ${isHighContrast ? dark.cardName : ''}`} onClick={() => handleEditCard(table.id, card.id)}>
                                                        {card.name}
                                                    </span>
                                                    <div className={styles.options} onClick={() => handleShowOptions(table.id, card.id)} >
                                                        <IoMdMore className={`${styles.optionsIcon} ${isHighContrast ? dark.optionsIcon : ''}`} size={20}/>
                                                    </div>
                                                </div>
                                            )}
                                            {card.tagColor && (
                                                <div className={styles.tagColor} style={{ backgroundColor: card.tagColor, width: '50px', height: '10px', borderRadius: '4px', margin: '5px 0' }}></div>
                                            )}
                                        </div>
                                    ))}
                                    {newCardData.tableId === table.id ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={newCardData.name}
                                                onChange={(e) => setNewCardData({ ...newCardData, name: e.target.value })}
                                                placeholder="Enter card name"
                                                className={`${styles.inputCard} ${isHighContrast ? dark.inputCard : ''}`}
                                            />
                                            <button className={`${styles.saveButton} ${isHighContrast ? dark.saveButton : ''}`} onClick={saveCard}>Save Card</button>
                                            <button className={`${styles.cancelButton} ${isHighContrast ? dark.cancelButton : ''}`} onClick={cancelAddCard}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button className={`${styles.addButton} ${isHighContrast ? dark.addButton : ''}`} onClick={() => addCard(table.id)}>
                                                New Card
                                                <GoPlus size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {isAddingTable ? (
                        <div>
                            <input
                                type="text"
                                value={newTableName}
                                onChange={(e) => setNewTableName(e.target.value)}
                                placeholder="Enter table name"
                                className={`${styles.inputAddTable} ${isHighContrast ? dark.inputAddTable : ''}`}
                            />
                            <button className={`${styles.saveTable} ${isHighContrast ? dark.saveTable : ''}`} onClick={saveTable}>Save Table</button>
                            <button className={`${styles.cancelButton} ${isHighContrast ? dark.cancelButton : ''}`} onClick={cancelAddTable}>Cancel</button>
                        </div>
                    ) : (
                        <button className={`${styles.addTable} ${isHighContrast ? dark.addTable : ''}`} onClick={addTable}>
                            New Table
                            <GoPlus size={20} color={isHighContrast ? '#A67B5B' : '#061826'}/>
                        </button>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={`${styles.modalContent} ${isHighContrast ? dark.modalContent : ''}`} style={{ top: `${modalPosition.top}px`, left: `${modalPosition.left}px` }}>
                        {!selectedOption && (
                            <>
                                <button className={styles.modalTag} onClick={() => handleSelectOption('tag')}>Adicionar Tag</button>
                                {tables.find(table => table.id === showCardOptions.tableId)
                                    .cards.find(card => card.id === showCardOptions.cardId)
                                    .tagColor && (
                                    <button className={`${styles.modalRemoveTag} ${isHighContrast ? dark.modalRemoveTag : ''}`} onClick={removeTag}>Remover Tag</button>
                                )}
                                <button className={styles.modalDelete} onClick={() => deleteCard(showCardOptions.tableId, showCardOptions.cardId)}>Deletar</button>
                            </>
                        )}
                        {selectedOption === 'tag' && (
                            <div className={styles.tagOptions}>
                                <button onClick={() => handleTagChange('#FFFFFF')} style={{ backgroundColor: '#FFFFFF' }} className={styles.tagColors}/>
                                <button onClick={() => handleTagChange('#000000')} style={{ backgroundColor: '#000000' }} className={styles.tagColors}/>
                                <button onClick={() => handleTagChange('#87C0D9')} style={{ backgroundColor: '#87C0D9' }} className={styles.tagColors}/>
                                <button onClick={() => handleTagChange('#195BBE')} style={{ backgroundColor: '#195BBE' }} className={styles.tagColors}/>
                                <button onClick={() => handleTagChange('#551E9C')} style={{ backgroundColor: '#551E9C' }} className={styles.tagColors}/>
                                <button onClick={() => handleTagChange('#DB5DA9')} style={{ backgroundColor: '#DB5DA9' }} className={styles.tagColors}/>
                                <button onClick={() => handleTagChange('#B21023')} style={{ backgroundColor: '#B21023' }} className={styles.tagColors}/>
                                <button onClick={() => handleTagChange('#DB5B13')} style={{ backgroundColor: '#DB5B13' }} className={styles.tagColors}/>
                                <button onClick={() => handleTagChange('#ffd86c')} style={{ backgroundColor: '#ffd86c' }} className={styles.tagColors}/>
                                <button onClick={() => handleTagChange('#62C017')} style={{ backgroundColor: '#62C017' }} className={styles.tagColors}/>
                                <button onClick={() => handleTagChange('#347103')} style={{ backgroundColor: '#347103' }} className={styles.tagColors}/>
                            </div>
                        )}
                        <button className={styles.modalCloseButton} onClick={closeModal}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
