const isEditMode = (editMode: boolean, userRole: string) => {
    return editMode && userRole !== 'administrator';
}

export default isEditMode;