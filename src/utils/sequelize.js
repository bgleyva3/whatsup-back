const getDataValues = (sequelizeObj) => {
    console.log(sequelizeObj)
    return JSON.parse(JSON.stringify(sequelizeObj))
}

module.exports = getDataValues