const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");
const client = new Discord.Client;   
const talkedRecently = new Set();
var prefix = '.';

let woods = require("./woods.json");
let stone = require("./stone.json");

client.on("ready", async message =>{
    console.log(`${client.user.username} est en ligne sur ${client.guilds.size} serveur.s ! `)
})

client.login('NDc1NjQ3MTczNTk0MzE2ODAw.XQoZ7A.lJDcLeyyu4AIMAcJxY3QAhuJ33Q').catch(error => console.log(error))

client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

});

client.on("message", message => {

    var args = message.content.split(" ").slice(1)

    if(message.content.startsWith(prefix + 'ping')) {
        //if(!message.author.hasPermission("MANAGE_GUILD")) { return message.channel.send("Vous n'avez pas les permissions suffisantes pour effectuer cette action.")}
        let début = Date.now();
        message.channel.send('Ping')
            .then((m) => m.edit(`Pong : **${Date.now() - début}**ms`));
    
            console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à exécuté la commande ping le ${moment().format('llll')} pour une réponse de ${Date.now() - début} ms. `)
    
    
    } else if(message.content.startsWith(prefix + 'inv')) {

        if(message.guild.id === '491671055581184020' || '546618899790299147') {

            var membre = message.mentions.members.first() || message.member;
        
            if(!woods[membre.id]){
                woods[membre.id] = {
                  woods: 0
                };
              }
            
            let uwoods = woods[membre.id].woods;
        
            if(!stone[membre.id]){
                stone[membre.id] = {
                    stone: 0
                };
              }
            
              let ustone = stone[membre.id].stone;
        
              var invEmbed = new Discord.RichEmbed()
              .setTitle("Inventaire")
              .setAuthor(membre.user.username, membre.user.displayAvatarURL)
              .setColor("#000000")
              .addField("Bois :deciduous_tree:", uwoods)
              .addField("Pierres <:stone:589053130960797699>", ustone)
              .setFooter(`Inventaire de ${membre.user.username} demandé par ${message.author.tag}`, membre.user.displayAvatarURL)
        
              message.channel.send(invEmbed);
        
              console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à exécuté la commande inv pour ${membre.user.username} le ${moment().format('llll')}.`)
        
            } else return message.channel.send("Cette commande est désactivée sur ce serveur.");

    } else if(message.content.startsWith(prefix + 'work')){

        if(message.guild.id === '491671055581184020' || '546618899790299147'){

            if (talkedRecently.has(message.author.id)) {
              message.channel.send(`Vous devez attendre une heure avant de pouvoir exécuter de nouveau cette commande ${message.author}.`);
              } else {
          
              var membre = message.member;
          
              var numberWood = Math.floor(Math.random()*50)+15;
              var numberStone = Math.floor(Math.random()*40)+15;
          
              var pUser = message.member;
              
              var result = new Discord.RichEmbed()
              .setColor("#000000")
              .setTitle("Résultat !")
              .setAuthor(membre.user.username, membre.user.displayAvatarURL)
              .addField("Bois :deciduous_tree:", `Vous gagnez ${numberWood} de bois !`)
              .addField("Pierres <:stone:589053130960797699>", `Vous gagnez ${numberStone} de pierre !` )
              .setFooter("Résultat de la commande work pour " + membre.user.username)
          
              if(!stone[pUser.id]){
                  stone[pUser.id] = {
                      stone: 0
                };
              }
            
              let pstone = stone[pUser.id].stone;
          
            
              stone[pUser.id] = {
                  stone: pstone + parseInt(numberStone)
              };
          
              fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
                if(err) cosole.log(err)
              });
          
              fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
                  if(err) cosole.log(err)
              });
          
              
              if(!woods[pUser.id]){
                  woods[pUser.id] = {
                    woods: 0
                  };
                }
              
                let pwoods = woods[pUser.id].woods;
            
              
                woods[pUser.id] = {
                  woods: pwoods + parseInt(numberWood)
                };
            
                fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
                  if(err) cosole.log(err)
                });
              
                fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
                  if(err) cosole.log(err)
                });
          
              message.channel.send(result)
          
              console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à exéxuté la commande work et à gagné ${numberStone} de pierre et ${numberWood} bois ${moment().format('llll')}.`)
           
              talkedRecently.add(message.author.id);
              setTimeout(() => {
              
                talkedRecently.delete(message.author.id);
              }, 3600000);
              }
            } else return message.channel.send("Cette commande est désactivée sur ce serveur.");

    } else if(message.content.startsWith(prefix + "add-stone")){

        if(message.guild.id === '491671055581184020' || '546618899790299147') {
            if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send("Il semblerait que vous n'ayez pas les permissions suffisantes.")
        
            let pUser = message.mentions.users.first()
            if(!pUser) return message.channel.send("Vous devez préciser un membre !")
            
            var nombre = message.content.split (" ").slice(1);
        
            if (!nombre[1]) return message.channel.send("Vous devez préscisez un nombre maximun !")
            else if (isNaN(nombre[1])) { return message.channel.send('Veuillez spécifier un nombre !'); }
        
            if(!stone[pUser.id]){
                stone[pUser.id] = {
                    stone: 0
              };
            }
          
            let pstone = stone[pUser.id].stone;
        
          
            stone[pUser.id] = {
                stone: pstone + parseInt(nombre[1])
            };
        
            fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
              if(err) cosole.log(err)
            });
          
            message.channel.send(`${message.author} à ajouté ${nombre[1]} de pierre à ${pUser} .`);
          
            fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
              if(err) cosole.log(err)
            });
          
            console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à ajouté ${nombre[1]} de pierre à ${pUser} le ${moment().format('llll')}.`)
          
        } else return message.channel.send("Cette commande est désactivée sur ce serveur.");


    } else if(message.content.startsWith(prefix + "add-woods")){

        if(message.guild.id === '491671055581184020' || '546618899790299147') {
            if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send("Il semblerait que vous n'ayez pas les permissions suffisantes.")
        
            let pUser = message.mentions.users.first()
            if(!pUser) return message.channel.send("Vous devez préciser un membre !")
            
            var nombre = message.content.split (" ").slice(1);
        
            if (!nombre[1]) return message.channel.send("Vous devez préscisez un nombre maximun !")
            else if (isNaN(nombre[1])) { return message.channel.send('Veuillez spécifier un nombre !'); }
        
            if(!woods[pUser.id]){
              woods[pUser.id] = {
                woods: 0
              };
            }
          
            let pwoods = woods[pUser.id].woods;
        
          
            woods[pUser.id] = {
              woods: pwoods + parseInt(nombre[1])
            };
        
            fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
              if(err) cosole.log(err)
            });
          
            message.channel.send(`${message.author} à ajouté ${nombre[1]} de bois à ${pUser} .`);
          
            fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
              if(err) cosole.log(err)
            });
          
            console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à ajouté ${nombre[1]} de bois à ${pUser} le ${moment().format('llll')}.`)
          
          } else return message.channel.send("Cette commande est désactivée sur ce serveur.");
        
    } else if(message.content.startsWith(prefix + 'give-stone')){

        if(message.guild.id === '491671055581184020' || '546618899790299147' ) {

            if(!stone[message.author.id]){
              return message.reply("Vous n'avez pas assez de pierre !")
            }
            
          
            let pUser = message.mentions.users.first()
            if(!pUser) return message.channel.send("Vous n'avez pas précisé de membre !")
          
            if(!stone[pUser.id]){
              stone[pUser.id] = {
                  stone: 0
              };
            }
          
            let pstone = stone[pUser.id].stone;
            let sstone = stone[message.author.id].stone;
          
            if(sstone < args[1]) return message.reply("Vous n'avez pas assez de pierre !");
            else if (isNaN(args[1])) { return message.channel.send('Veuillez spécifier un nombre !'); }
           
          
            stone[message.author.id] = {
              stone: sstone - parseInt(args[1])
            };
          
            stone[pUser.id] = {
              stone: pstone + parseInt(args[1])
            };
            fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
              if(err) cosole.log(err)
            });
          
            message.channel.send(`${message.author} à donné ${args[1]} de pierre à ${pUser} .`);
          
            fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
              if(err) cosole.log(err)
            });
          
            console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à donné ${args[1]} de pierre à ${pUser} le ${moment().format('llll')}..`) 
            
          } else return message.channel.send("Cette commande est désactivée sur ce serveur.");
    } else if(message.content.startsWith(prefix + 'give-woods')){

        if(message.guild.id === '491671055581184020' || '546618899790299147') {

            if(!woods[message.author.id]){
              return message.reply("Vous n'avez pas assez de bois !")
            }
            
          
            let pUser = message.mentions.users.first()
            if(!pUser) return message.channel.send("Vous n'avez pas précisé de membre !")
          
            if(!woods[pUser.id]){
              woods[pUser.id] = {
                  woods: 0
              };
            }
          
            let pwoods = woods[pUser.id].woods;
            let swoods = woods[message.author.id].woods;
          
            if(swoods < args[1]) return message.reply("Vous n'avez pas assez de bois !");
            else if (isNaN(args[1])) { return message.channel.send('Veuillez spécifier un nombre !'); }
           
          
            woods[message.author.id] = {
              woods: swoods - parseInt(args[1])
            };
          
            woods[pUser.id] = {
              woods: pwoods + parseInt(args[1])
            };
            fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
              if(err) cosole.log(err)
            });
          
            message.channel.send(`${message.author} à donné ${args[1]} de bois à ${pUser} .`);
          
            fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
              if(err) cosole.log(err)
            });
          
            console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à donné ${args[1]} de bois à ${pUser} le ${moment().format('llll')}..`) 
            
            } else return message.channel.send("Cette commande est désactivée sur ce serveur.");

    } else if(message.content.startsWith(prefix + "remove-stone")){

        if(message.guild.id === '491671055581184020' || '546618899790299147') {
            if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send("Il semblerait que vous n'ayez pas les permissions suffisantes.")
        
            let pUser = message.mentions.users.first()
            if(!pUser) return message.channel.send("Vous devez préciser un membre !")
            
            var nombre = message.content.split (" ").slice(1);
        
            if (!nombre[1]) return message.channel.send("Vous devez préscisez un nombre maximun !")
            else if (isNaN(nombre[1])) { return message.channel.send('Veuillez spécifier un nombre !'); }
        
            if(!stone[pUser.id]){
                stone[pUser.id] = {
                    stone: 0
              };
            }
          
            let pstone = stone[pUser.id].stone;
        
          
            stone[pUser.id] = {
                stone: pstone - parseInt(args[1])
            };
        
            fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
              if(err) cosole.log(err)
            });
          
            message.channel.send(`${message.author} à enlevé ${args[1]} de pierre à ${pUser} .`);
          
            fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
              if(err) cosole.log(err)
            });
          
            console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à enlevé ${args[1]} de pierre à ${pUser} le ${moment().format('llll')}.`)
          } else return message.channel.send("Cette commande est désactivée sur ce serveur.");

    } else if(message.content.startsWith(prefix + 'remove-woods')){

        if(message.guild.id === '491671055581184020' || '546618899790299147'){

  
            if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send("Il semblerait que vous n'ayez pas les permissions suffisantes.")
        
            let pUser = message.mentions.users.first()
            if(!pUser) return message.channel.send("Vous devez préciser un membre !")
            
            var nombre = message.content.split (" ").slice(1);
        
            if (!nombre[1]) return message.channel.send("Vous devez préscisez un nombre maximun !")
            else if (isNaN(nombre[1])) { return message.channel.send('Veuillez spécifier un nombre !'); }
        
            if(!woods[pUser.id]){
              woods[pUser.id] = {
                woods: 0
              };
            }
          
            let pwoods = woods[pUser.id].woods;
        
          
            woods[pUser.id] = {
              woods: pwoods - parseInt(args[1])
            };
        
            fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
              if(err) cosole.log(err)
            });
          
            message.channel.send(`${message.author} à enlevé ${args[1]} de bois à ${pUser} .`);
          
            fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
              if(err) cosole.log(err)
            });
          
            console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à enlevé ${args[1]} de bois à ${pUser} le ${moment().format('llll')}.`)
        
          } else return message.channel.send("Cette commande est désactivée sur ce serveur.");

    } else if(message.content.startsWith(prefix + 'reset-stone')){

        if(message.guild.id === "491671055581184020" || '546618899790299147') {

            if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send("Il semblerait que vous n'ayez pas les permissions suffisantes.")
            
            let pUser = message.mentions.users.first()
            
            if(!pUser) return message.channel.send("Vous devez préciser un membre !")
            
        
            if(!stone[pUser.id]){
                stone[pUser.id] = {
                    stone: 0
              };
            }
          
            let pstone = stone[pUser.id].stone;
          
            stone[pUser.id] = {
                stone: pstone *0
            };
        
            fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
              if(err) cosole.log(err)
            });
          
            message.channel.send(`${message.author} reset la pierre de ${pUser} (${pstone} de pierre).`);
          
            fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
              if(err) cosole.log(err)
            });
          
            console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à reset le bois de ${pUser} (${pstone} de pierre) le ${moment().format('llll')}.`)
          
          } else return message.channel.send("Cette commande est désactivée sur ce serveur.");

    } else if(message.content.startsWith(prefix + 'reset-woods')) {

        if(message.guild.id === "491671055581184020" || '546618899790299147') {

            if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send("Il semblerait que vous n'ayez pas les permissions suffisantes.")
            
            let pUser = message.mentions.users.first()
            
            if(!pUser) return message.channel.send("Vous devez préciser un membre !")
            
        
            if(!stone[pUser.id]){
                stone[pUser.id] = {
                    stone: 0
              };
            }
          
            let pstone = stone[pUser.id].stone;
          
            stone[pUser.id] = {
                stone: pstone *0
            };
        
            fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
              if(err) cosole.log(err)
            });
          
            message.channel.send(`${message.author} reset la pierre de ${pUser} (${pstone} de pierre).`);
          
            fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
              if(err) cosole.log(err)
            });
          
            console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à reset le bois de ${pUser} (${pstone} de pierre) le ${moment().format('llll')}.`)
          
          } else return message.channel.send("Cette commande est désactivée sur ce serveur.");$

    } else if(message.content.startsWith(prefix + 'shop')) {

        if(message.guild.id === '491671055581184020' || '546618899790299147'){

            var member = message.member;
        
            var shop1 = new Discord.RichEmbed()
            .setTitle("Interface de création")
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setColor("#000000")
            .addField("`ID: 1`; Hôtel de ville", "Pierres <:stone:589053130960797699>: 500 \n Bois :deciduous_tree:: 300")
            .addField("`ID: 2`; Place", "Pierres <:stone:589053130960797699>: 800 \n Bois :deciduous_tree:: 50")
            .addField("`ID: 3`; Rue", "Pierres <:stone:589053130960797699>: 700 \n  Bois :deciduous_tree:: 30")
            .addField("`ID: 4`; Maison", "Pierres <:stone:589053130960797699>: 300 \n  Bois :deciduous_tree:: 600")
            .addField("`ID: 5`; Tribunal", "Pierres <:stone:589053130960797699>: 200 \n  Bois :deciduous_tree:: 600")
            .addField("`ID: 6`; Taverne", "Pierres <:stone:589053130960797699>: 250 \n  Bois :deciduous_tree:: 700")
            .setFooter("Interface de création, demandé par " + message.author.tag, member.user.displayAvatarURL)
        
            message.channel.send(shop1)
        
            } else return message.channel.send("Cette commande est désactivée sur ce serveur.");
    } else if(message.content.startsWith(prefix + 'thx')) {
        if(message.author.id === '386137991380336641'){
            message.channel.send("Merci !");
            client.destroy()
        }
    } else if(message.content.startsWith(prefix + 'buy')) {

        if(message.guild.id === '491671055581184020' || '546618899790299147') {

            var membre = message.member;
            var server = message.guild;
        
            if(!args[0]) return message.channel.send("Vous n'avez pas précisé l'id du batiment que vous voulez construire !")
        
            if(args[0] == '1'){
        
                if(!woods[membre.id]){
                    woods[membre.id] = {
                      woods: 0
                    };
                }
        
                  let uwoods = woods[membre.id].woods;
        
                if(!stone[membre.id]){
                      stone[membre.id] = {
                          stone: 0
                      };
                }
                  
                    let ustone = stone[membre.id].stone;
        
                    if(ustone < '500') return message.channel.send("Vous n'avez pas assez de pierre !")
                    else if(uwoods < '300') return message.channel.send("Vous n'avez pas assez de bois !")  
        
                    server.createChannel("Hôtel de ville", "text")
                    .then(channel => {
                        let category = server.channels.find(c => c.name == "Aras" && c.type == "category");
        
                        if (!category) throw new Error("Cette catégorie n'existe pas.");
                        channel.setParent(category.id);
                    }).catch(console.error);
        
                    stone[message.author.id] = {
                        stone: ustone - parseInt("500")
                      };
        
                    woods[message.author.id] = {
                        woods: uwoods - parseInt("300")
                      };  
        
                      fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
                        if(err) cosole.log(err)
                      });
                      
                      fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      message.channel.send("Vous avez acheté un hotel de ville.")
        
                      console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à acheté un hôtel de ville le ${moment().format('llll')}.`) 
        
                // --- Fin achat hdv --- //    
                     
            } else if(args[0] == '2') {
        
                if(!woods[membre.id]){
                    woods[membre.id] = {
                      woods: 0
                    };
                }
        
                  let uwoods = woods[membre.id].woods;
        
                if(!stone[membre.id]){
                      stone[membre.id] = {
                          stone: 0
                      };
                }
                  
                    let ustone = stone[membre.id].stone;
        
                    if(ustone < '800') return message.channel.send("Vous n'avez pas assez de pierre !")
                    else if(uwoods < '50') return message.channel.send("Vous n'avez pas assez de bois !")  
        
                    server.createChannel("Place", "text")
                    .then(channel => {
                        let category = server.channels.find(c => c.name == "Aras" && c.type == "category");
        
                        if (!category) throw new Error("Cette catégorie n'existe pas.");
                        channel.setParent(category.id);
                    }).catch(console.error);
        
                    stone[message.author.id] = {
                        stone: ustone - parseInt("800")
                      };
        
                    woods[message.author.id] = {
                        woods: uwoods - parseInt("50")
                      };  
        
                      fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
                        if(err) cosole.log(err)
                      });
                      
                      fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      message.channel.send("Vous avez acheté une place")
        
                      console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à acheté une place le ${moment().format('llll')}.`) 
        
                // --- Fin achat place --- /
        
            } else if(args[0] == '3') {
        
                if(!woods[membre.id]){
                    woods[membre.id] = {
                      woods: 0
                    };
                }
        
                  let uwoods = woods[membre.id].woods;
        
                if(!stone[membre.id]){
                      stone[membre.id] = {
                          stone: 0
                      };
                }
                  
                    let ustone = stone[membre.id].stone;
        
                    if(ustone < '700') return message.channel.send("Vous n'avez pas assez de pierre !")
                    else if(uwoods < '30') return message.channel.send("Vous n'avez pas assez de bois !")  
        
                    server.createChannel("Rue", "text")
                    .then(channel => {
                        let category = server.channels.find(c => c.name == "Aras" && c.type == "category");
        
                        if (!category) throw new Error("Cette catégorie n'existe pas.");
                        channel.setParent(category.id);
                    }).catch(console.error);
        
                    stone[message.author.id] = {
                        stone: ustone - parseInt("700")
                      };
        
                    woods[message.author.id] = {
                        woods: uwoods - parseInt("50")
                      };  
        
                      fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
                        if(err) cosole.log(err)
                      });
                      
                      fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      message.channel.send("Vous avez acheté une rue")
        
                      console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à acheté une rue le ${moment().format('llll')}.`) 
        
                // --- Fin achat rue --- /
        
            } else if(args[0] == '4') {
        
                if(!woods[membre.id]){
                    woods[membre.id] = {
                      woods: 0
                    };
                }
        
                  let uwoods = woods[membre.id].woods;
        
                if(!stone[membre.id]){
                      stone[membre.id] = {
                          stone: 0
                      };
                }
                  
                    let ustone = stone[membre.id].stone;
        
                    if(ustone < '300') return message.channel.send("Vous n'avez pas assez de pierre !")
                    else if(uwoods < '600') return message.channel.send("Vous n'avez pas assez de bois !")  
        
                    server.createChannel("Maison", "text")
                    .then(channel => {
                      let category = server.channels.find(c => c.name == "Aras" && c.type == "category");
        
                        if (!category) throw new Error("Cette catégorie n'existe pas.");
                        channel.setParent(category.id);
                    }).catch(console.error);
        
                    stone[message.author.id] = {
                        stone: ustone - parseInt("300")
                      };
        
                    woods[message.author.id] = {
                        woods: uwoods - parseInt("600")
                      };  
        
                      fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
                        if(err) cosole.log(err)
                      });
                      
                      fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      message.channel.send("Vous avez acheté une maison.")
        
                      console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à acheté une maison le ${moment().format('llll')}.`) 
        
                // --- Fin achat maison --- /
        
            } else if(args[0] == '5') {
        
                if(!woods[membre.id]){
                    woods[membre.id] = {
                      woods: 0
                    };
                }
        
                  let uwoods = woods[membre.id].woods;
        
                if(!stone[membre.id]){
                      stone[membre.id] = {
                          stone: 0
                      };
                }
                  
                    let ustone = stone[membre.id].stone;
        
                    if(ustone < '200') return message.channel.send("Vous n'avez pas assez de pierre !")
                    else if(uwoods < '600') return message.channel.send("Vous n'avez pas assez de bois !")  
        
                    server.createChannel("Tribunal", "text")
                    .then(channel => {
                        let category = server.channels.find(c => c.name == "Aras" && c.type == "category");
        
                        if (!category) throw new Error("Cette catégorie n'existe pas.");
                        channel.setParent(category.id);
                    }).catch(console.error);
        
                    stone[message.author.id] = {
                        stone: ustone - parseInt("200")
                      };
        
                    woods[message.author.id] = {
                        woods: uwoods - parseInt("600")
                      };  
        
                      fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
                        if(err) cosole.log(err)
                      });
                      
                      fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      message.channel.send("Vous avez acheté un tribunal.")
        
                      console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à acheté un tribunal le ${moment().format('llll')}.`) 
        
                // --- Fin achat tribunal --- /
        
            } else if(args[0] == '6'){
        
                if(!woods[membre.id]){
                    woods[membre.id] = {
                      woods: 0
                    };
                }
        
                  let uwoods = woods[membre.id].woods;
        
                if(!stone[membre.id]){
                      stone[membre.id] = {
                          stone: 0
                      };
                }
                  
                    let ustone = stone[membre.id].stone;
        
                    if(ustone < '250') return message.channel.send("Vous n'avez pas assez de pierre !")
                    else if(uwoods < '700') return message.channel.send("Vous n'avez pas assez de bois !")  
        
                    server.createChannel("Taverne", "text")
                    .then(channel => {
                        let category = server.channels.find(c => c.name == "Aras" && c.type == "category");
        
                        if (!category) throw new Error("Cette catégorie n'existe pas.");
                        channel.setParent(category.id);
                    }).catch(console.error);
        
                    stone[message.author.id] = {
                        stone: ustone - parseInt("250")
                      };
        
                    woods[message.author.id] = {
                        woods: uwoods - parseInt("700")
                      };  
        
                      fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
                        if(err) cosole.log(err)
                      });
                      
                      fs.writeFile("./woods.json", JSON.stringify(woods), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      fs.writeFile("./stone.json", JSON.stringify(stone), (err) => {
                        if(err) cosole.log(err)
                      });
        
                      message.channel.send("Vous avez acheté une taverne.")
        
                      console.log(`${message.guild.name}, #${message.channel.name}: ${message.author.tag} à acheté une taverne  le ${moment().format('llll')}.`) 
        
                // --- Fin achat taverne --- /
        
            }
        
          } else return message.channel.send("Cette commande est désactivée sur ce serveur");

    } /*else if(message.content.startsWith(prefix = 'help')){
      
      var helpEmded = new Discord.RichEmbed()
      .setColor("#000000")
      .setTitle("Menu d'aide")
      .addField(".work", "*cette commande vous permet de récoleter toutes les heures du bois et de la pierre.*")
      .addField(".inv", "*Cette commande vous permet de voir votre inventaire, et ainsi la quantité de ressource que vous possédez. Vous pouvez voir les ressources d'un autre membre en suivant la commande de son pseudo* `.inv @Worker`.")
      .addField(".shop", "*La commande* `.shop` *permet de voir ce qui est disponible, et leur coût.*")
      .addField(".buy", "*Cette commande vous permet d'acheter un bâtiment, grâce à son ID, disponible dans le shop*")
      .addField(".give-woods", "*Cette commande vous permet de donner du bois à un autre membre* `.give-woods @Worker 20`.")
      .addField("Modération: (réservée)", "`.add-stone`; `.add-woods`; `.remove-stone`; `.remove-woods`; `reset-stone`; `reset-woods`.")
      .setFooter("Menu d'aide, demandé par " + message.author.tag, message.member.displayAvatarURL)

      message.channel.send(helpEmded)
    }*/
});

client.on("message", message =>{

  if(message.content === prefix + 'help'){
  var helpEmded = new Discord.RichEmbed()
  .setColor("#000000")
  .setTitle("Menu d'aide")
  .addField(".work", "*cette commande vous permet de récoleter toutes les heures du bois et de la pierre.*")
  .addField(".inv", "*Cette commande vous permet de voir votre inventaire, et ainsi la quantité de ressource que vous possédez. Vous pouvez voir les ressources d'un autre membre en suivant la commande de son pseudo* `.inv @Worker`.")
  .addField(".shop", "*La commande* `.shop` *permet de voir ce qui est disponible, et leur coût.*")
  .addField(".buy", "*Cette commande vous permet d'acheter un bâtiment, grâce à son ID, disponible dans le shop*")
  .addField(".give-woods", "*Cette commande vous permet de donner du bois à un autre membre* `.give-woods @Worker 20`.")
  .addField("Modération: (réservée)", "`.add-stone`; `.add-woods`; `.remove-stone`; `.remove-woods`; `reset-stone`; `reset-woods`.")
  .setFooter("Menu d'aide, demandé par " + message.author.tag, message.member.displayAvatarURL)
  

  message.channel.send(helpEmded)
}
});