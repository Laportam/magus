module.exports=(sequelize, dataTypes) => {

    let alias = "Budget";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        client: {
            type: dataTypes.STRING
        },
        company: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        phone: {
            type: dataTypes.STRING
        },
        comments: {
            type: dataTypes.STRING
        },
        received_at: {
            type: dataTypes.STRING
        },
        answered_at: {
            type: dataTypes.STRING
        },
        product: {
            type: dataTypes.STRING
        },
        SKU: {
            type: dataTypes.STRING
        },
        quantity: {
            type: dataTypes.INTEGER
        }
    }
    
    let config = {
        tableName: "budget",
        timestamps:false
    }

    const Budget = sequelize.define(alias, cols, config);
    
    return Budget;
}
