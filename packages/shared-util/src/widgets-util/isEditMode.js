const isEditMode = (editMode, userRole) => {
    return editMode && userRole !== 'administrator';
};

module.exports = isEditMode;
