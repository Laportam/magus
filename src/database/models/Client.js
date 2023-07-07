module.exports=(sequelize, dataTypes) => {

    let alias = "Clients";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName: "clients",
        timestamps:false
    }

    const Clients = sequelize.define(alias, cols, config);
    
    return Clients;
}
