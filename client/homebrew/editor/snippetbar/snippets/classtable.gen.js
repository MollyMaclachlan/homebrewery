const _ = require('lodash');

const features = [
	'Astrological Botany',
	'Astrological Chemistry',
	'Biochemical Sorcery',
	'Civil Alchemy',
	'Consecrated Biochemistry',
	'Demonic Anthropology',
	'Divinatory Mineralogy',
	'Genetic Banishing',
	'Hermetic Geography',
	'Immunological Incantations',
	'Nuclear Illusionism',
	'Ritual Astronomy',
	'Seismological Divination',
	'Spiritual Biochemistry',
	'Statistical Occultism',
	'Police Necromancer',
	'Sixgun Poisoner',
	'Pharmaceutical Gunslinger',
	'Infernal Banker',
	'Spell Analyst',
	'Gunslinger Corruptor',
	'Torque Interfacer',
	'Exo Interfacer',
	'Gunpowder Torturer',
	'Orbital Gravedigger',
	'Phased Linguist',
	'Mathematical Pharmacist',
	'Plasma Outlaw',
	'Malefic Chemist',
	'Police Cultist'
];

const classnames = ['Archivist', 'Fancyman', 'Linguist', 'Fletcher',
	'Notary', 'Berserker-Typist', 'Fishmongerer', 'Manicurist', 'Haberdasher', 'Concierge'];

const levels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th'];

const profBonus = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];

const getFeature = (level)=>{
	let res = [];
	if(_.includes([4, 6, 8, 12, 14, 16, 19], level+1)){
		res = ['Ability Score Improvement'];
	}
	res = _.union(res, _.sampleSize(features, _.sample([0, 1, 1, 1, 1, 1])));
	if(!res.length) return '─';
	return res.join(', ');
};

const maxes = [4, 3, 3, 3, 3, 2, 2, 1, 1];

const drawSlots = function(Slots, rows, padding){
	let slots = Number(Slots);
	return _.times(rows, function(i){
		const max = maxes[i];
		if(slots < 1) return _.pad('—', padding);
		const res = _.min([max, slots]);
		slots -= res;
		return _.pad(res.toString(), padding);
	}).join(' | ');
};

module.exports = {
	full : function(classes){
		const classname = _.sample(classnames);


		let cantrips = 3;
		let spells = 1;
		let slots = 2;
		return `{{${classes}\n##### The ${classname}\n` +
		`| Level | Proficiency | Features                                                | Cantrips | Spells | --- Spell Slots Per Spell Level ---         |||||||||\n`+
		`|      ^| Bonus      ^|                                                        ^| Known   ^| Known ^| 1st | 2nd | 3rd | 4th | 5th | 6th | 7th | 8th | 9th |\n`+
		`|:-----:|:-----------:|:--------------------------------------------------------|:--------:|:------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|\n${
			_.map(levels, function(levelName, level){
				const res = [
					_.pad(levelName, 5),
					_.pad(`+${profBonus[level]}`, 11),
					_.padEnd(getFeature(level), 55),
					_.pad(cantrips.toString(), 8),
					_.pad(spells.toString(), 6),
					drawSlots(slots, 9, 3),
				].join(' | ');

				cantrips += _.random(0, 1);
				spells += _.random(0, 1);
				slots += _.random(0, 2);

				return `| ${res} |`;
			}).join('\n')}\n}}\n\n`;
	},

	half : function(classes){
		const classname =  _.sample(classnames);

		let featureScore = 1;
		return `{{${classes}\n##### The ${classname}\n` +
		`| Level | Proficiency Bonus | Features                                                | ${_.pad(_.sample(features), 26)} |\n` +
		`|:-----:|:-----------------:|:--------------------------------------------------------|:--------------------------:|\n${
			_.map(levels, function(levelName, level){
				const res = [
					_.pad(levelName, 5),
					_.pad(`+${profBonus[level]}`, 17),
					_.padEnd(getFeature(level), 55),
					_.pad(`+${featureScore}`, 26),
				].join(' | ');

				featureScore += _.random(0, 1);

				return `| ${res} |`;
			}).join('\n')}\n}}\n\n`;
	},

	third : function(classes){
		const classname = _.sample(classnames);

		let cantrips = 3;
		let spells = 1;
		let slots = 2;
		return `{{${classes}\n##### ${classname} Spellcasting\n` +
		`| Class  | Cantrips | Spells  |  --- Spells Slots per Spell Level ---  ||||\n` +
		`| Level ^| Known   ^| Known  ^|   1st    |   2nd    |   3rd    |   4th    |\n` +
		`|:------:|:--------:|:-------:|:--------:|:--------:|:--------:|:--------:|\n${
			_.map(levels, function(levelName, level){
				const res = [
					_.pad(levelName, 6),
					_.pad(cantrips.toString(), 8),
					_.pad(spells.toString(), 7),
					drawSlots(slots, 4, 8),
				].join(' | ');

				cantrips += _.random(0, 1);
				spells += _.random(0, 1);
				slots += _.random(0, 1);

				return `| ${res} |`;
			}).join('\n')}\n}}\n\n`;
	}

};
