module.exports=(sequelize, dataTypes) => {

    let alias = "Admin";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        } ,
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        email: {
            type:dataTypes.STRING,
            allowNull: false,
        },
        password: {
            type:dataTypes.STRING,
            allowNull: false,
        },

    }
    let config = {
        tableName: "admins",
        timestamps:false
    }

    const Admin = sequelize.define(alias, cols, config);
    
    return Admin;
}
