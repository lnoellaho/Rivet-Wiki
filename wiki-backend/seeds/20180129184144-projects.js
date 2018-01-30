'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Projects',
      [
        {
          name: 'Oval Head Semi-Tubular Rivet',
          location: 'San Diego',
          collaborator: 'Christina Merz',
          information: "A “semi-tubular rivet” has a manufactured head on one end and tubular shank hole-depth of less than 112% of the shank diameter of the rivet.  A “tubular rivet”, also known as a hollow rivet, has shank hole-depth equal to or greater than 112% of the shank diameter.  Common rivet head styles are oval, truss, button, flat and countersunk. Among the raw materials used are steel, stainless steel, aluminum, brass, and copper.  Rivet plating and coating options are selected by end user dependent on the application.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Flat Countersunk Semi-Tubular Rivet',
          location: 'Philadelphia',
          collaborator: 'Leeann Ho',
          information: "Semi-tubular rivets help assemble a wide variety of materials and are one of the most common forms of rivets used. Semi-tubular rivets can be employed for multiple applications, such as luggage, brakes, and 3 ring binders. Semi-tubular rivets are defined as having a hole-depth less than 112% of the mean body diameter. Semi-tubular rivets require a pre-drilled hole. Minimum order quantity is 25,000 pieces.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Flat Head Threaded Clinch Nut',
          location: 'Zuma',
          collaborator: 'Arnold Henry',
          information: "Rivet-Nuts can be used in a wide range of applications and are designed to provide a very efficient and cost-effective method of placing permanent threads in thin materials. Installed from one side, Rivet-Nuts are perfect for use in metal, fiberglass and rigid plastic previously too thin for tapped threads. Rivet-Nuts provide a neat appearance and once in place, the internal threads are ready for a screw or bolt.",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
