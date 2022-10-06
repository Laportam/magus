module.exports=(sequelize, dataTypes) => {

    let alias = "Images";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        filename: {
            type: dataTypes.STRING,
            allowNull: false
        },
        image_id: {
            type: dataTypes.STRING,
            primaryKey: true,
            allowNull: false
        }
    }
    let config = {
        tableName: "Images",
        timestamps:false
    }

    const Images = sequelize.define(alias, cols, config);
    
    return Images;
}
