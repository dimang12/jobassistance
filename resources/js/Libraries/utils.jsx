let utils = {
    /**
     * Build a tree from a flat array of objects
     * @param data
     * @returns {*[]}
     */
    buildTree: (data) => {
        if (!data) return [];
        // Create a map to store each item by its id
        const map = {};
        data.forEach(item => {
            map[item.id] = { ...item, children: [] };
        });

        // Initialize the root of the tree
        const tree = [];

        // Iterate through the items and build the tree
        data.forEach(item => {
            if (item.parent_id === null) {
                // If the item has no parent, it's a root node
                tree.push(map[item.id]);
            } else {
                // If the item has a parent, add it to the parent's children
                if (map[item.parent_id]) {
                    map[item.parent_id].children.push(map[item.id]);
                }
            }
        });

        return tree;
    }
};


export default utils;

