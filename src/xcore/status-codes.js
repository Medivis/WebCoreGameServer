// Module Includes
//=============================================================================================



// userFunctions
//=============================================================================================

/**
 * Renders a not found message
 */
module.exports.notFound = function (req, res) {
    res.status(404).render('msg', {
        title: '404 Not Found',
        text: 'Diese Seine wurde nicht gefunden. Falls dies öfter passiert kontaktierten sieuns bitte unter info@ichwillwerben.de'
    });
}