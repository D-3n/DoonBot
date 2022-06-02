module.exports = {
    name: 'jetinapen',
    description: 'Info on jetina pens',
    usage: '',
    aliases: ['penacc', 'guaranteedacc', 'penboss'],
    needswriteperms: true,
    hidden: true,
    execute(message) {
        message.channel.send({content: 'Pen accessory and boss gear:', files: ['./personalFiles/penacc.jpeg', './personalFiles/penboss.png']})
        
    }
}