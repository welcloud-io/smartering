Ext.ns('App');
//~ Ext.Loader.setConfig({ enabled : true, disableCaching : true });
//~ Ext.Loader.setPath('Sch', '../../js/Sch'); // Fichiers avec les différentes langues

//~ Ext.require([
    //~ 'Sch.panel.SchedulerGrid',
    //~ 'Sch.plugin.Zones'
//~ ]);


Ext.onReady(function () {
    App.SchedulerDemo.init();
});

App.SchedulerDemo = {

    // Initialize application
    init : function () {
        Ext.define('Event', {
            extend : 'Sch.model.Event',
            fields : [
                {name : 'Title'},
                {name : 'Type'}
            ]
        });

        var sched = Ext.create("Sch.panel.SchedulerGrid", {
            //~ height                  		: ExampleDefaults.height, // si hauteur et largeur non précisée, le panel prend 100% en espace
            //~ width                   		: ExampleDefaults.width,		
            rowHeight               		: 40,
            eventBarTextField       		: 'Title',
            viewPreset              		: 'hourAndDay',
            startDate               		: new Date(2011, 11, 9, 8),
            endDate                 		: new Date(2011, 11, 9, 23),
            orientation             		: 'vertical',
            constrainDragToResource 	: false,
            eventBarIconClsField    	: 'Type',
            snapToIncrement         	: true,
            eventResizeHandles      	: 'end',
            viewConfig : {
                // Experimental for CSS3 enabled browsers only
                eventAnimations : true
            },

            eventBodyTemplate : new Ext.XTemplate( // sert à formater le libellé l'évènement
                '<dl><dt>{[Ext.Date.format(values.StartDate, "G:i")]}</dt><dd>{Title}</dd>'
            ),

            //~ eventRenderer : function (event, resource, data) {
                //~ data.cls = resource.data.Name;
                //~ return event.data;
            //~ },

            //~ lockedViewConfig : {
                //~ stripeRows  : false,
                //~ getRowClass : function (resource) {
                    //~ return resource.data.Name;
                //~ }
            //~ },

            // Setup static columns
            //~ columns          : [
                //~ {header : 'Name', sortable : true, width : 100, dataIndex : 'Name'}
            //~ ],

            // Store holding all the resources
            resourceStore     : Ext.create("Sch.data.ResourceStore", {
                model : 'Sch.model.Resource',
                data  : [
                    {Id : 'MadMike', Name : '28 Aug 2013'},
                ]
            }),

            // Store holding all the events
            eventStore        : Ext.create("Sch.data.EventStore", {
                model : 'Event',
                data  : [
                    {ResourceId : 'MadMike', Type : 'Call', Title : 'Lancement du projet smartering', StartDate : "2011-12-09 10:00", EndDate : "2011-12-09 11:00"},
                ]
            }),

            //~ onEventCreated : function (newEventRecord) {
                //~ // Overridden to provide some defaults before adding it to the store
                //~ newEventRecord.set({
                    //~ Title : "Hey, let's meet",
                    //~ Type  : 'Meeting'
                //~ });
            //~ },

        });

        sched.render(Ext.get("bryntum_scheduler")); //Ext.getBody());
	sched.getSchedulingView().fitColumns();
    }
};
