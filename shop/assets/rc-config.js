
var menu_config = {
  "menu": {
    "title_subscriber": "Mon espace abonné",
    "title": "Mon espace",
    "order" : {
      "shopify": [],
      "recharge": []
    },
    "configurations": [
      {
        "type": "0", // possible values : 0 => core page | 1 => external link | 2 => custom page
        "id": "subscriptions", // l'application doit anticiper un template lié à l'id. Dans ce cas, "last_order" page avec les dernieres commandes non-livrées encore.
        "scope": "2", // possible values : 0 => Shopify + recharge | 1 => Shopify only | 2 => Recharge only.
        "path": "/section=last_order",
        "labels" : "Mon abonnement",
        "icon": "https://cdn.shopify.com/s/files/1/2598/9270/files/subscribtion.png?v=1599235961"
      },
      {
        "type": "0", // possible values : 0 => core page | 1 => external link | 2 => custom page
        "id": "subscriptions", // l'application doit anticiper un template lié à l'id. Dans ce cas, "last_order" page avec les dernieres commandes non-livrées encore.
        "scope": "1", // possible values : 0 => Shopify + recharge | 1 => Shopify only | 2 => Recharge only.
        "path": "/section=last_order",
        "labels" : "Ma dernière commande",
        "icon": "https://cdn.shopify.com/s/files/1/2598/9270/files/subscribtion.png?v=1599235961"
      },
      {
        "type": "0",
        "id": "orders_history",
        "scope": "0",
        "path": "/section=orders_history",
        "labels" : "Mes commandes archivées",
        "icon": "https://cdn.shopify.com/s/files/1/2598/9270/files/orders.png?v=1599235961"
      },
      {
        "type": "0",
        "id": "addresses",
        "scope": "0",
        "path": "/section=profile_r",
        "labels" : "Mes adresses",
        "icon": "https://cdn.shopify.com/s/files/1/2598/9270/files/Group_6821d47c-6fa4-4f38-979a-19e1c7dd883e.png?v=1599737071"
      },
      {
        "type": "0",
        "id": "delivery_methods",
        "scope": "2",
        "path": "/section=delivery_methods",
        "labels" : {
          "fr": "Mon mode de livraison",
          "en": "My delivery methods"
        },
        "icon": "https://cdn.shopify.com/s/files/1/2598/9270/files/delivery.png?v=1599235961"
      },
      {
        "type": "0",
        "id": "payment_methods",
        "scope": "2",
        "path": "/section=payment_methods",
        "labels" : {
          "fr": "Mes moyens de paiement",
          "en": "My payment methods"
        },
        "icon": "https://cdn.shopify.com/s/files/1/2598/9270/files/payment.png?v=1599235961"
      },
      {
        "type": "3",
        "id": "contact",
        "scope": "0",
        "path": "https://franklinpetfood.com/pages/contactez-nous",
        "labels" : {
          "fr": "Contacter le support",
          "en": "Customer support"
        },
        "icon": "https://cdn.shopify.com/s/files/1/2598/9270/files/support.png?v=1599235961"
      },
      {
        "type": "3",
        "id": "referrals",
        "scope": "0",
        "path": "https://franklinpetfood.com/pages/parrainage",
        "labels" : {
          "fr": "Parrainage",
          "en": "Referrals"
        },
        "icon": "https://cdn.shopify.com/s/files/1/2598/9270/files/referals.png?v=1599235961"
      },
      {
        "type": "2",
        "id": "logout",
        "scope": "0",
        "path": "/account/logout",
        "labels" : {
          "fr": "Déconnexion",
          "en": "Logout"
        },
        "icon": "https://cdn.shopify.com/s/files/1/2598/9270/files/logout.png?v=1599235961"
      }
    ]
  }
}

var general_config = {
	"money_format": "{{ value }}$",
	"date_format": "dd/mm/yyyy",
	"date_time_format": "yyyy-mm-dd hh:mm",
	"view_edits": "modal",
	"filters_products": {
		"type": "manual",
		"doubleFilters": true,
		"exclude_product_type": ["Echantillon", "Verre"],
		"list": ["Chien", "Chat"],
		"list2": ["Croquettes", "Friandises", "Pâtées"]
	},
	"alerts": {
		"updateAdresseSubscription": {
			"success": "Adresse modifiée !",
			"error": "Erreur veuillez réessayer plus tard",
		},
		"updateDate": {
			"success": "Date modifiée !",
			"error": "Erreur veuillez réessayer plus tard",
		},
		"editVariant": {
			"success": "Conditionnement modifiée !",
			"error": "Erreur veuillez réessayer plus tard",
		},
		"updateQuantity": {
			"success": "Quantité modifiée !",
			"error": "Erreur veuillez réessayer plus tard",
		},
		"changeDateAndFrequency": {
			"success": "Date et fréquence modifiées !",
			"error": "Erreur veuillez réessayer plus tard",
		},
		"cancelProduct": {
			"success": "Produit retiré !",
			"error": "Erreur veuillez réessayer plus tard",
		},
		"deleteSubscriptions": {
			"success": "Abonnement supprimé !",
			"error": "Erreur veuillez réessayer plus tard",
		},
		"activeProduct": {
			"success": "Produit activé !",
			"error": "Erreur veuillez réessayer plus tard",
		},
		"skipProduct": {
			"success": "Produit mis de côté !",
			"error": "Erreur veuillez réessayer plus tard",
		},
		"addDiscount": {
			"success": "Code promo appliqué !",
			"error": "Code promo invalide",
		},
		"changeProduct": {
			"success": "Produit modifié !",
			"error": "Erreur veuillez réessayer plus tard",
		},
		"addAdresse": {
			"success": "Adresse ajoutée !",
			"error": "Erreur veuillez réessayer plus tard",
		},
		"updateAdresse": {
			"success": "Adresse modifiée !",
			"error": "Erreur veuillez réessayer plus tard",
		},
		"updatePersonalsInformations": {
			"success": "Informations modifiées !",
			"error": "Erreur veuillez réessayer plus tard",
		},
		"addSubscription": {
			"success": "Produit ajouté !",
			"error": "Erreur veuillez réessayer plus tard",
		},
		"updateAdresse": {
			"success": "Adresse modifiée !",
			"error": "Problème sur l'adresse ajoutée",
		},
		"quantityMinError": {
			"error": "Quantité minimum sélectionnée",
		},
		"formFieldRequired": {
			"error": "Tous les champs requis ne sont pas complets !",
		},
		"cancelProductError": {
			"error": "Vous devez sélectionner une raison",
		},
		"selectDelivery": {
			"success": "Demande prise en compte",
			"error": "Erreur veuillez réessayer plus tard",
		},
	},
	"delivery_methods": [
		{
			"id": "dpd",
			"icon": "https://cdn.shopify.com/s/files/1/2598/9270/files/image_1.png?v=1599476590",
			"type": "A domicile sous 48h-72h",
			"price": "3.20 €",
			"price_description": "",
			"delivery_free": true
		},
		{
			"id": "mondial_relay",
			"icon": "https://cdn.shopify.com/s/files/1/2598/9270/files/image_7.png?v=1599476590",
			"type": "En point relais sous 48h-72h",
			"price": "1.90 €",
			"price_description": "",
			"delivery_free": true
		},
		{
			"id": "colissimo",
			"icon": "https://cdn.shopify.com/s/files/1/2598/9270/files/image_8.png?v=1599476590",
			"type": "A domicile sous 48h-72h",
			"price": "4.50 € ou 6 €",
			"price_description": "Selon le poids de votre panier",
			"delivery_free": false
		},
		{
			"id": "chronopost",
			"icon": "https://cdn.shopify.com/s/files/1/2598/9270/files/image_9.png?v=1599476590",
			"type": "A domicile sous 24h",
			"price": "7.50 € ou 12 €",
			"price_description": "Selon le poids de votre panier",
			"delivery_free": false
		},
		{
			"id": "colissimo_belgique",
			"icon": "https://cdn.shopify.com/s/files/1/2598/9270/files/Capture_d_ecran_2020-09-09_a_15.36.28.png?v=1599658616",
			"type": "A domicile sous 48h-72h",
			"price": "4.90 € ou 6,90 €",
			"price_description": "Selon le poids de votre panier",
			"delivery_free": false
		},
	],
	"cancel_subscriptions": {
		"title": "Nous souhaitons nous améliorer, dites nous pourquoi vous nous quittez.",
		"showRetentions": false,
		"confirme_cta": {
			"option": "cancel_product_submit",
			"block_type": "button",
			"position": "right",
			"settings": {
				"label": "Résilier mon abonnement",
			}
		},
		"cancel_cta": {
			"option": "close_modal",
			"block_type": "button",
			"position": "left",
			"settings": {
				"label": "Finalement je reste !",
			}
		},
		"reasons": [
			{
				"block_type": "radio",
				"size": "1/2",
				"settings": {
					"id": "radio_1",
					"label": "Les produits sont trop chers",
					"type": "radio",
					"value": false,
					"name": "cancellation_reason"
				},
				"counter_actions": [
					{
						"type": 0,
						"action": "discount_code",
						"cta_text": "Appliquer le code promo",
						"value": "FRANKLIN10",
						"message": "We're sorry to hear that you'd like to cancel, here a discount code valide for FRANKLIN10, you can apply directly to your next "
					}
				]
			},
			{
				"block_type": "radio",
				"size": "1/2",
				"settings": {
					"id": "radio_2",
					"label": "Je ne souhaitais pas m'abonner",
					"type": "radio",
					"value": false,
					"name": "cancellation_reason"
				},
				"counter_actions": [
					{
						"type": 0,
						"action": "discount_code",
						"cta_text": "Appliquer le code promo",
						"value": "FRANKLIN10",
						"message": "We're sorry to hear that you'd like to cancel, here a discount code valide for xxx xxxxx, you can apply directly to your next "
					}
				]
			},
			{
				"block_type": "radio",
				"size": "1/2",
				"settings": {
					"id": "radio_3",
					"label": "Il y a des problèmes de livraison",
					"type": "radio",
					"value": false,
					"name": "cancellation_reason"
				},
				"counter_actions": [
					{
						"type": 1,
						"path": "/pages/contactez-nous",
						"cta_text": "Nous contacter ?",
						"message": "Nous sommes désolés pour cet incident, n'hésitez pas à nous contacter pour nous préciser le problème rencontré."
					}
				]
			},
			{
				"block_type": "radio",
				"size": "1/2",
				"settings": {
					"id": "radio_4",
					"label": "Il y a eu des erreurs dans ma commande",
					"type": "radio",
					"value": false,
					"name": "cancellation_reason"
				},
				"counter_actions": [
					{
						"type": 1,
						"path": "/pages/contactez-nous",
						"cta_text": "Nous contacter ?",
						"message": "Nous somme désolé d'entendre ça, vous pouvez si vous le souhaitez nous contacter"
					}
				]
			},
			{
				"block_type": "radio",
				"size": "1/2",
				"settings": {
					"id": "radio_5",
					"label": "Mon chat ou mon chien n'aime pas",
					"type": "radio",
					"value": false,
					"name": "cancellation_reason"
				},
				"counter_actions": [
					{
						"type": 2,
						"action": "change_product",
						"cta_text": "Je change de recette",
						"message": "Vous pouvez changer de recette, si vous le souhaitez."
					}
				]
			},
			{
				"block_type": "radio",
				"size": "1/2",
				"settings": {
					"id": "radio_6",
					"label": "Autre",
					"type": "radio",
					"value": false,
					"name": "cancellation_reason"
				},
				"counter_actions": [
					{
						"type": 1,
						"path": "/pages/contactez-nous",
						"cta_text": "Nous contacter ?",
						"message": "Nous sommes navrés de vous voir partir, n'hésitez pas à nous contacter pour nous préciser le problème rencontré."
					}
				]
			}
		]
	}
}

var pages_config = {
  "pages_subscriber": [
    {
      "id": "subscriptions",
      "components": [
        {
          "block_type": "error_payement",
          "title" : "Erreur sur votre dernier paiement.",
          "subtitle": "Une erreur est survenue sur votre prochaine facturation. Vous pouvez actualiser vos moyens de paiement en cliquant sur 'Mettre à jour'",
          "block_level_options": [
            {
              "option": "update_payement",
              "block_type": "button",
              "settings": {
                "label": "Mettre à jour"
              }
            }
          ],
        },
        {
          "block_type": "last_order",
          "title" : "",
          "subtitle": "",
          "view": "inline",
          "query": {
            "first": 1
          }
        },
        {
          "block_type": "schedule",
          "title" : "Ma prochaine expédition le",
          "subtitle": "",
          "view": "featured",
          "query": {
            "first": 10
          },
          "block_level_options": [
            {
              "option": "edit_scheduled_date",
              "block_type": "datepicker",
              "settings": {
                "background": true,
                "button": false,
                "label": "Date de prochaine expédition",
                "displayLabel": true,
              }
            },
            {
              "option": "edit_address",
              "block_type": "select",
              "settings": {
                "label": "Adresse de livraison",
                "displayLabel": true,
                "button": false,
                "name": "edit_address",
                "background": true,
                "full_width": true
              },
              "actions": [
                {
                  'value': 'add_address',
                  'text':'Ajouter une nouvelle adresse'
                }
              ]
            },
            {
              "option": "edit_delivery",
              "block_type": "select",
              "settings": {
                "label": "Mode de livraison",
                "displayLabel": true,
                "name": "edit_delivery",
                "background": true,
                "full_width": true
              },
              "actions": [
                {
                  'value': 'update_mondial_relay',
                  'text':'Modifier mon point relais'
                },
                {
                  'value': 'update_delivery',
                  'text':'Changer de mode de livraison'
                }
             ]
            },
            {
              "option": "edit_discount_code",
              "block_type": "link",
              "settings": {
                "label": "Ajouter un code promo"
              }
            },
        		{
        			"option": "display_deliveries",
        			"block_type": "link",
        			"settings": {
        				"label": "En savoir plus"
        			}
        		}
          ],
          "item_level_options": [
            {
              "option": "update_frequency",
              "settings": {
                "label": "Modifier la fréquence et la date"
              }
            },
            {
              "option": "change_product",
              "settings": {
                "label": "Changer de recette"
              }
            },
            {
              "option": "cancel_product",
              "settings": {
                "label": "Retirer le produit",
              }
            }
          ],
          "configurations": {
            "columns": [
              {
                "label": "Adresse"
              },
              {
                "label": "Date"
              },
              {
                "label": "Status"
              },
              {
                "label": "Type"
              },
              {
                "label": "Total"
              },
              {
                "label": "Actions"
              }
            ],
            "text_address": {
              "show": true,
              "label": "À l'adresse :"
            },
            "text_delivery": {
              "show": true,
              "label": "Via"
            },
            "subtitle_2": {
              "show": true,
              "label": "Contenu de ma prochaine expédition"
            },
            "subtotal": {
              "show": true,
              "label": "Sous-total"
            },
            "shipping": {
              "show": true,
              "label": "Livraison"
            },
            "discount": {
              "show": true,
              "label": "Réduction"
            },
            "refunded": {
              "show": true,
              "label": "Remboursé"
            },
            "total": {
              "show": true,
              "label": "Total"
            },
            "credit_card": {
              "show": true,
              "label": "Vous serez débité(e) de"
            }
          }
        },
        {
          "block_type": "all_subscriptions",
          "title" : "Les autres produits de mon abonnement.",
          "subtitle": "",
          "view": "featured",
          "query": {
          },
          "block_level_options": [
            {
              "option": "add_product_subscribe",
              "type": "button",
              "settings": {
                "label": "Ajouter un produit"
              }
            }
          ],
          "item_level_options": [
            {
              "option": "update_frequency",
              "settings": {
                "scope": "3",
                "label": "Modifier la fréquence et la date",
                "collection": false
              }
            },
            {
              "option": "change_product",
              "settings": {
                "scope": "3",
                "label": "Changer de recette",
                "collection": false
              }
            },
            {
              "option": "cancel_product",
              "settings": {
                "label": "Retirer le produit",
              }
            }
          ],
          "configurations": {
            "columns": [
              {
                "label": "Adresse"
              },
              {
                "label": "Date"
              },
              {
                "label": "Status"
              },
              {
                "label": "Type"
              },
              {
                "label": "Total"
              },
              {
                "label": "Actions"
              }
            ],
          }
        },
        {
          "block_type": "cancel_subscriptions",
          "title" : "Les produits retirés de mon abonnement.",
          "subtitle": "",
          "view": "featured",
          "query": {
          },
          "block_level_options": [
          ],
          "item_level_options": [
            {
              "option": "reactivate_subscribe",
              "type": "button",
              "settings": {
                "label": "Réactiver"
              }
            }
          ],
          "configurations": {
          }
        },
        {
          "block_type": "delete_subscriptions",
          "title" : "",
          "subtitle": "",
          "block_level_options": [
            {
              "option": "delete_subscriptions",
              "type": "button",
              "settings": {
                "label": "Désactiver mon abonnement"
              }
            }
          ],
          "item_level_options": [
          ],
          "configurations": {
          }
        }
      ]
    },
    {
      "id": "orders_history",
      "components": [
        {
          "block_type": "last_order",
          "title" : "Mes commandes archivées.",
          "subtitle": "",
          "view": "table",
          "query": {
            "first": 100
          },
          "configurations": {
            "columns": [
              {
                "label": "Numéro de commande"
              },
              {
                "label": "Date"
              },
              {
                "label": "Montant"
              },
              {
                "label": "État"
              }
            ],
            "subtotal": {
              "show": true,
              "label": "Sous-total"
            },
            "shipping": {
              "show": true,
              "label": "Livraison"
            },
            "discount": {
              "show": true,
              "label": "Réduction"
            },
            "refunded": {
              "show": true,
              "label": "Remboursé"
            },
            "total": {
              "show": true,
              "label": "Total"
            },
            "link_back": {
              "show": true,
              "label": "Retour aux commandes archivées"
            },
          }
        }
      ]
    },
    {
      "id": "addresses",
      "components": [
        {
          "block_type": "edit_addresses",
          "title" : "Mes adresses",
          "subtitle": "",
          "block_level_options": [
            {
              "option": "add_address",
              "block_type": "button",
              "position": "right",
              "settings": {
                "label": "Ajouter une adresse",
                "name": "add_address"
              }
            }
          ],
          "item_level_options": [
            {
              "option": "form_personals_informations",
              "inputs": [
                {
                  "block_type": "button",
                  "size": "1/1",
                  "position": "right",
                  "settings": {
                    "id": "edit_address",
                    "label": "Editer",
                    "name": "edit_address"
                  }
                }
              ]
            }
          ]
        },
      ]
    },
    {
      "id": "informations",
      "components": [
        {
          "block_type": "edit_personals_informations",
          "title" : "Mes informations personnelles",
          "subtitle": "",
          "block_level_options": [
            {
              "block_type": "button",
              "position": "right",
              "settings": {
                "label": "Enregistrer",
              }
            }
          ],
          "item_level_options": [
            {
              "option": "form_personals_informations",
              "inputs": [
                {
                  "block_type": "input",
                  "size": "1/2",
                  "settings": {
                    "id": "firstname",
                    "required": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Prénom",
                    "placeholder": "Prénom",
                    "type": "text",
                    "name": "firstname"
                  }
                },
                {
                  "block_type": "input",
                  "size": "1/2",
                  "settings": {
                    "id": "lastname",
                    "required": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Nom",
                    "placeholder": "Nom",
                    "type": "text",
                    "name": "lastname"
                  }
                }
              ]
            }
          ],
        },
        {
          "block_type": "edit_addresses",
          "title" : "Mes adresses",
          "subtitle": "",
          "block_level_options": [
            {
              "option": "add_address",
              "block_type": "button",
              "position": "right",
              "settings": {
                "label": "Ajouter une adresse",
                "name": "add_address"
              }
            }
          ],
          "item_level_options": [
            {
              "option": "form_personals_informations",
              "inputs": [
                {
                  "block_type": "button",
                  "size": "1/1",
                  "position": "right",
                  "settings": {
                    "id": "edit_address",
                    "label": "Editer",
                    "name": "edit_address"
                  }
                }
              ]
            }
          ]
        },
      ]
    },
    {
      "id": "payment_methods",
      "components": [
        {
          "block_type": "payment_methods-item",
          "title" : "Mon moyen de paiement",
          "subtitle": "",
          "block_level_options": [

          ],
          "item_level_options": [
            {
              "option": "form_edit_payment",
              "inputs": [
                {
                  "block_type": "button",
                  "position": "right",
                  "settings": {
                    "label": "Mettre à jour",
                  }
                }
              ],
              "icons": [
                {
                    "title": "visa",
                    "link": "https://cdn.shopify.com/s/files/1/2598/9270/files/payment.png?v=1599235961"
                },
                {
                    "title": "mastercard",
                    "link": "https://cdn.shopify.com/s/files/1/2598/9270/files/payment.png?v=1599235961"
                },
                {
                    "title": "paypal",
                    "link": "https://cdn.shopify.com/s/files/1/2598/9270/files/paypal_1.png?v=1599476255"
                }
              ]
            }
          ],
          "configurations": {
            "title" : {
              "show": false,
              "label": ""
            },
            "subtitle": {
              "show": false,
              "label": ""
            },
            "description_1": {
              "show": true,
              "label": "Si vous souhaitez modifier vos paramètres de facturation PayPal, connectez-vous sur le site"
            },
            "hr": {
              "show": false
            },
            "subtitle_2": {
              "show": false,
              "label": ""
            },
            "description_2": {
              "show": true,
              "label": "Si vous souhaitez payer par carte bleu au lieu de PayPal,"
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": false,
              "label": ""
            },
            "description_3": {
              "show": false,
              "label": ""
            },
            "link_back": {
              "show": false,
              "label": ""
            },
          }
        }
      ]
    },
    {
      "id": "delivery_methods",
      "components": [
        {
          "block_type": "delivery_methods-item",
          "title" : "Mon mode de livraison",
          "subtitle": "",
          "block_level_options": [

          ],
          "item_level_options": [
            {
              "option": "form_edit_delivery",
              "inputs": [
                {
                  "block_type": "button",
                  "position": "right",
                  "settings": {
                    "label": "Modifier",
                  }
                }
              ],
              "icons": [
                {
            			"link": "https://cdn.shopify.com/s/files/1/2598/9270/files/image_1.png?v=1599476590",
            			"title": "dpd"
            		},
            		{
            			"link": "https://cdn.shopify.com/s/files/1/2598/9270/files/image_7.png?v=1599476590",
                  "title": "mondial"
            		},
            		{
            			"link": "https://cdn.shopify.com/s/files/1/2598/9270/files/image_8.png?v=1599476590",
                  "title": "colissimo"
            		},
            		{
            			"link": "https://cdn.shopify.com/s/files/1/2598/9270/files/image_9.png?v=1599476590",
                  "title": "chronopost"
            		},
            		{
            			"link": "https://cdn.shopify.com/s/files/1/2598/9270/files/Capture_d_ecran_2020-09-09_a_15.36.28.png?v=1599658616",
                  "title": "belgique"
            		},
              ]
            }
          ],
          "configurations": {
            "title" : {
              "show": false,
              "label": ""
            },
            "subtitle": {
              "show": false,
              "label": ""
            },
            "description_1": {
              "show": false,
              "label": ""
            },
            "hr": {
              "show": false
            },
            "subtitle_2": {
              "show": false,
              "label": ""
            },
            "description_2": {
              "show": false,
              "label": ""
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": false,
              "label": ""
            },
            "description_3": {
              "show": false,
              "label": ""
            },
            "link_back": {
              "show": false,
              "label": ""
            },
          }
        },
        {
          "block_type": "delivery_methods_table",
          "title" : "Tarifs des transporteurs (France métropolitaine et Belgique)",
          "subtitle": "",
          "view": "table",
          "block_level_options": [

          ],
          "item_level_options": [

          ],
          "configurations": {
            "columns": [
              {
                "label": "Transporteur"
              },
              {
                "label": "Type"
              },
              {
                "label": "Prix"
              },
              {
                "label": "Livraison offerte dès 45€ d'achat"
              }
            ],
            "title" : {
              "show": false,
              "label": ""
            },
            "subtitle": {
              "show": false,
              "label": ""
            },
            "description_1": {
              "show": true,
              "label": ""
            },
            "hr": {
              "show": false
            },
            "subtitle_2": {
              "show": false,
              "label": ""
            },
            "description_2": {
              "show": true,
              "label": ""
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": false,
              "label": ""
            },
            "description_3": {
              "show": false,
              "label": ""
            },
            "link_back": {
              "show": false,
              "label": ""
            },
          }
        },
      ]
    }
  ],
  "pages_nosubscriber": [
    {
      "id": "subscriptions",
      "components": [
        {
          "block_type": "last_order_details",
          "title" : "Commande",
          "subtitle": "",
          "view": "featured",
          "block_level_options": [
          ],
          "item_level_options": [
          ],
          "configurations": {
            "subtotal": {
              "show": true,
              "label": "Sous-total"
            },
            "shipping": {
              "show": true,
              "label": "Livraison"
            },
            "discount": {
              "show": true,
              "label": "Réduction"
            },
            "refunded": {
              "show": true,
              "label": "Remboursé"
            },
            "total": {
              "show": true,
              "label": "Total"
            },
            "link_back": {
              "show": false,
              "label": ""
            },
          }
        }
      ]
    },
    {
      "id": "orders_history",
      "components": [
        {
          "block_type": "last_order",
          "title" : "Mes commandes archivées.",
          "subtitle": "",
          "view": "table",
          "query": {
            "first": 100
          },
          "block_level_options": [
          ],
          "configurations": {
            "columns": [
              {
                "label": "Numéro de commande"
              },
              {
                "label": "Date"
              },
              {
                "label": "Montant"
              },
              {
                "label": "État"
              }
            ],
            "subtotal": {
              "show": true,
              "label": "Sous-total"
            },
            "shipping": {
              "show": true,
              "label": "Livraison"
            },
            "discount": {
              "show": true,
              "label": "Réduction"
            },
            "refunded": {
              "show": true,
              "label": "Remboursé"
            },
            "total": {
              "show": true,
              "label": "Total"
            },
            "link_back": {
              "show": true,
              "label": "Retour aux commandes archivées"
            },
          }
        }
      ]
    },
    {
      "id": "informations",
      "components": [
        {
          "block_type": "edit_personals_informations",
          "title" : "Mes informations personnelles",
          "subtitle": "",
          "block_level_options": [
            {
              "block_type": "button",
              "position": "right",
              "settings": {
                "label": "Enregistrer",
              }
            }
          ],
          "item_level_options": [
            {
              "option": "form_personals_informations",
              "inputs": [
                {
                  "block_type": "input",
                  "size": "1/2",
                  "settings": {
                    "id": "firstname",
                    "required": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Prénom",
                    "placeholder": "Prénom",
                    "type": "text",
                    "name": "firstname"
                  }
                },
                {
                  "block_type": "input",
                  "size": "1/2",
                  "settings": {
                    "id": "lastname",
                    "required": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Nom",
                    "placeholder": "Nom",
                    "type": "text",
                    "name": "lastname"
                  }
                },
                {
                  "block_type": "checkbox",
                  "size": "1/1",
                  "settings": {
                    "id": "acceptsMarketing",
                    "label": "Je souhaite recevoir les nouvelles et offres exclusives Franklin",
                    "type": "acceptsMarketing",
                    "name": "acceptsMarketing"
                  }
                }
              ]
            }
          ],
        },
      ]
    },
    {
      "id": "addresses",
      "components": [
        {
          "block_type": "edit_addresses",
          "title" : "Mes adresses",
          "subtitle": "",
          "block_level_options": [
            {
              "option": "add_address",
              "block_type": "button",
              "position": "right",
              "settings": {
                "label": "Ajouter une adresse",
                "name": "add_address"
              }
            }
          ],
          "item_level_options": [
            {
              "option": "form_personals_informations",
              "inputs": [
                {
                  "block_type": "button",
                  "size": "1/1",
                  "position": "right",
                  "settings": {
                    "id": "edit_address",
                    "label": "Editer",
                    "name": "edit_address"
                  }
                }
              ]
            }
          ]
        },
      ]
    }
  ],
  "modals": [
    {
      "id": "add_address",
      "components": [
        {
          "block_type": "add_address",
          "title" : "Ajouter une adresse",
          "subtitle": "",
          "block_level_options": [

          ],
          "item_level_options": [
            {
              "option": "form_add_address",
              "inputs": [
                {
                  "block_type": "input",
                  "size": "1/2",
                  "settings": {
                    "id": "firstname",
                    "required": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Prénom",
                    "placeholder": "Prénom",
                    "type": "text",
                    "value": "",
                    "name": "firstname"
                  }
                },
                {
                  "block_type": "input",
                  "size": "1/2",
                  "settings": {
                    "id": "lastname",
                    "required": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Nom",
                    "placeholder": "Nom",
                    "type": "text",
                    "value": "",
                    "name": "lastname"
                  }
                },
                {
                  "block_type": "input",
                  "size": "1/1",
                  "settings": {
                    "id": "address",
                    "required": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Adresse",
                    "placeholder": "Adresse",
                    "type": "text",
                    "value": "",
                    "name": "address"
                  }
                },
                {
                  "block_type": "input",
                  "size": "1/1",
                  "settings": {
                    "id": "address_2",
                    "required": false,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Complément d'adresse (facultatif)",
                    "placeholder": "Complément d'adresse (facultatif)",
                    "type": "text",
                    "value": "",
                    "name": "address_2"
                  }
                },
                {
                  "block_type": "input",
                  "size": "1/1",
                  "settings": {
                    "id": "phone",
                    "required": true,
                    "error": "Veuillez rentrer un numéro de téléphone valide.",
                    "label": "Téléphone",
                    "placeholder": "Téléphone",
                    "type": "phone",
                    "value": "",
                    "name": "phone"
                  }
                },
                {
                  "block_type": "input",
                  "size": "1/3",
                  "settings": {
                    "id": "zip",
                    "required": true,
                    "error": "Veuillez rentrer un code postal valide.",
                    "label": "Code postal",
                    "placeholder": "Code postal",
                    "type": "number",
                    "value": "",
                    "name": "zip"
                  }
                },
                {
                  "block_type": "input",
                  "size": "1/3",
                  "settings": {
                    "id": "city",
                    "required": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Ville",
                    "placeholder": "Ville",
                    "type": "text",
                    "value": "",
                    "name": "city"
                  }
                },
                {
                  "block_type": "select",
                  "size": "1/3",
                  "settings": {
                    "id": "country",
                    "background": false,
                    "required": false,
                    "button": false,
                    "full_width": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Pays",
                    "displayLabel": true,
                    "placeholder": "Pays",
                    "type": "select",
                    "name": "country",
                    "options": [
                      {
                        "value": "France",
                        "text": "France",
                      },
                      {
                        "value": "Belgium",
                        "text": "Belgique",
                      },
                    ]
                  },
                },
                {
                  "block_type": "checkbox",
                  "size": "1/2",
                  "settings": {
                    "id": "set_address_default",
                    "label": "Définir comme adresse favorite",
                    "type": "checkbox",
                    "value": false,
                    "name": "set_address_default"
                  }
                }
              ],
              "submit": [
                {
                  "block_type": "button",
                  "position": "center",
                  "settings": {
                    "label": "Enregistrer",
                  }
                }
              ]
            }
          ],
          "configurations": {
            "title" : {
              "show": true,
              "label": "Ajouter une adresse"
            },
            "subtitle": {
              "show": false,
              "label": ""
            },
            "description_1": {
              "show": false,
              "label": ""
            },
            "hr": {
              "show": false
            },
            "subtitle_2": {
              "show": false,
              "label": ""
            },
            "description_2": {
              "show": false,
              "label": ""
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": false,
              "label": ""
            },
            "description_3": {
              "show": false,
              "label": ""
            },
            "link_back": {
              "show": false,
              "label": ""
            },
          }
        },
      ]
    },
    {
      "id": "edit_address",
      "components": [
        {
          "block_type": "edit_address",
          "block_level_options": [

          ],
          "item_level_options": [
            {
              "option": "form_edit_address",
              "inputs": [
                {
                  "block_type": "input",
                  "size": "1/2",
                  "settings": {
                    "id": "firstname",
                    "required": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Prénom",
                    "placeholder": "Prénom",
                    "type": "text",
                    "value": "",
                    "name": "firstname"
                  }
                },
                {
                  "block_type": "input",
                  "size": "1/2",
                  "settings": {
                    "id": "lastname",
                    "required": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Nom",
                    "placeholder": "Nom",
                    "type": "text",
                    "value": "",
                    "name": "lastname"
                  }
                },
                {
                  "block_type": "input",
                  "size": "1/1",
                  "settings": {
                    "id": "address",
                    "required": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Adresse",
                    "placeholder": "Adresse",
                    "type": "text",
                    "value": "",
                    "name": "address"
                  }
                },
                {
                  "block_type": "input",
                  "size": "1/1",
                  "settings": {
                    "id": "address_2",
                    "required": false,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Complément d'adresse (facultatif)",
                    "placeholder": "Complément d'adresse (facultatif)",
                    "type": "text",
                    "value": "",
                    "name": "address_2"
                  }
                },
                {
                  "block_type": "input",
                  "size": "1/1",
                  "settings": {
                    "id": "phone",
                    "required": true,
                    "error": "Veuillez rentrer un numéro de téléphone valide.",
                    "label": "Téléphone",
                    "placeholder": "Téléphone",
                    "type": "phone",
                    "value": "",
                    "name": "phone"
                  }
                },
                {
                  "block_type": "input",
                  "size": "1/3",
                  "settings": {
                    "id": "zip",
                    "required": true,
                    "error": "Veuillez rentrer un code postal valide.",
                    "label": "Code postal",
                    "placeholder": "Code postal",
                    "type": "number",
                    "value": "",
                    "name": "zip"
                  }
                },
                {
                  "block_type": "input",
                  "size": "1/3",
                  "settings": {
                    "id": "city",
                    "required": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Ville",
                    "placeholder": "Ville",
                    "type": "text",
                    "value": "",
                    "name": "city"
                  }
                },
                {
                  "block_type": "select",
                  "size": "1/3",
                  "settings": {
                    "background": false,
                    "required": false,
                    "button": false,
                    "full_width": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Pays",
                    "displayLabel": true,
                    "placeholder": "Pays",
                    "type": "select",
                    "name": "country",
                    "options": [
                      {
                        "value": "France",
                        "text": "France",
                      },
                      {
                        "value": "Belgium",
                        "text": "Belgique",
                      },
                    ]
                  }
                }
              ],
              "submit": [
                {
                  "block_type": "button",
                  "position": "center",
                  "settings": {
                    "label": "Enregistrer",
                  }
                }
              ]
            }
          ],
          "configurations": {
            "title" : {
              "show": true,
              "label": "Modifier l'adresse"
            },
            "subtitle": {
              "show": false,
              "label": ""
            },
            "description_1": {
              "show": false,
              "label": ""
            },
            "hr": {
              "show": false
            },
            "subtitle_2": {
              "show": false,
              "label": ""
            },
            "description_2": {
              "show": false,
              "label": ""
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": false,
              "label": ""
            },
            "description_3": {
              "show": false,
              "label": ""
            },
            "link_back": {
              "show": false,
              "label": ""
            },
          }
        },
      ]
    },
    {
      "id": "edit_payment_method",
      "components": [
        {
          "block_type": "edit_payment_method",
          "block_level_options": [

          ],
          "item_level_options": [

          ],
          "configurations": {
            "title" : {
              "show": true,
              "label": "Modifier votre moyen de paiement"
            },
            "subtitle": {
              "show": false,
              "label": ""
            },
            "description_1": {
              "show": false,
              "label": ""
            },
            "hr": {
              "show": false
            },
            "subtitle_2": {
              "show": false,
              "label": ""
            },
            "description_2": {
              "show": false,
              "label": ""
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": false,
              "label": ""
            },
            "description_3": {
              "show": false,
              "label": ""
            },
            "link_back": {
              "show": false,
              "label": ""
            },
            "image": {
              "show": true,
              "link": "https://cdn.shopify.com/s/files/1/2598/9270/files/Iphy6.jpg?v=1593618893"
            },
          }
        },
      ]
    },
    {
      "id": "update_delivery",
      "components": [
        {
          "block_type": "update_delivery",
          "block_level_options": [
          ],
          "item_level_options": [
            {
              "option": "form_update_delivery",
              "inputs": [

              ],
              "submit": [
                {
                  "block_type": "button",
                  "position": "center",
                  "settings": {
                    "label": "Enregistrer",
                  }
                }
              ]
            }
          ],
          "configurations": {
            "columns": [
              {
                "label": "Transporteur"
              },
              {
                "label": "Type"
              },
              {
                "label": "Prix"
              },
              {
                "label": "Livraison offerte dès 45€ d'achat"
              },
              {
                "label": ""
              }
            ],
            "title" : {
              "show": true,
              "label": "Changer de mode de livraison"
            },
            "subtitle": {
              "show": true,
              "label": "Mode de livraison actuel"
            },
            "description_1": {
              "show": false,
              "label": ""
            },
            "hr": {
              "show": true
            },
            "subtitle_2": {
              "show": true,
              "label": "Modes de livraisons disponibles"
            },
            "description_2": {
              "show": true,
              "label": "Important : si vous modifiez le mode de livraison, le changement sera effectif le prochain jour ouvré."
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": true,
              "label": "CONFIGURER MA LIVRAISON MONDIAL RELAY"
            },
            "description_3": {
              "show": true,
              "label": "Choisissez votre point relais."
            },
            "link_back": {
              "show": false,
              "label": ""
            }
          }
        },
      ]
    },
    {
      "id": "update_frequency",
      "components": [
        {
          "block_type": "update_frequency",
          "block_level_options": [
          ],
          "item_level_options": [
            {
              "option": "form_update_delivery",
              "inputs": [
                {
                  "block_type": "datepicker",
                  "size": "1/1",
                  "settings": {
                    "id": "date_delivery",
                    "background": true,
                    "button": false,
                    "required": false,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Date de prochaine expédition",
                    "displayLabel": true,
                    "placeholder": "Date de prochaine expédition",
                    "type": "datepicker",
                    "name": "date_delivery"
                  }
                },
                {
                  "block_type": "link",
                  "size": "1/1",
                  "settings": {
                    "id": "add_to_next_delivery",
                    "label": "Ajouter à ma prochaine expédition",
                    "placeholder": "Ajouter à ma prochaine expédition",
                    "type": "link",
                    "name": "add_to_next_delivery"
                  }
                },
                {
                  "block_type": "select",
                  "size": "1/1",
                  "settings": {
                    "id": "select_frequency",
                    "background": true,
                    "required": false,
                    "button": false,
                    "full_width": true,
                    "error": "Veuillez compléter ce champs.",
                    "label": "Fréquence",
                    "displayLabel": true,
                    "placeholder": "Fréquence",
                    "type": "select",
                    "name": "select_frequency"
                  }
                },
              ],
              "submit": [
                {
                  "block_type": "submit",
                  "position": "center",
                  "settings": {
                    "label": "Enregistrer",
                  }
                }
              ]
            }
          ],
          "configurations": {
            "title" : {
              "show": true,
              "label": "Modifier la fréquence et la date d'expédition"
            },
            "subtitle": {
              "show": false,
              "label": ""
            },
            "description_1": {
              "show": false,
              "label": ""
            },
            "hr": {
              "show": false
            },
            "subtitle_2": {
              "show": false,
              "label": ""
            },
            "description_2": {
              "show": false,
              "label": ""
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": false,
              "label": ""
            },
            "description_3": {
              "show": false,
              "label": ""
            },
            "link_back": {
              "show": false,
              "label": ""
            }
          }
        },
      ]
    },
    {
      "id": "update_mondial_relay",
      "components": [
        {
          "block_type": "update_mondial_relay",
          "block_level_options": [
          ],
          "item_level_options": [
            {
              "option": "form_update_mondial_relay",
              "submit": [
                {
                  "block_type": "submit",
                  "position": "center",
                  "settings": {
                    "label": "Enregistrer",
                  }
                }
              ]
            }
          ],
          "configurations": {
            "title" : {
              "show": true,
              "label": "Modifier mon point de retrait Mondial Relay"
            },
            "subtitle": {
              "show": true,
              "label": "Mon point mondial relay actuel"
            },
            "description_1": {
              "show": false,
              "label": ""
            },
            "hr": {
              "show": true
            },
            "subtitle_2": {
              "show": true,
              "label": "Définit un nouveau point relais"
            },
            "description_2": {
              "show": true,
              "label": "Choisissez votre nouveau point relais"
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": false,
              "label": ""
            },
            "description_3": {
              "show": false,
              "label": ""
            },
            "link_back": {
              "show": false,
              "label": ""
            }
          }
        },
      ]
    },
    {
      "id": "change_product",
      "components": [
        {
          "block_type": "change_product",
          "block_level_options": [

          ],
          "item_level_options": [
            {
              "option": "form_change_product",
              "inputs": [
                {
                  "block_type": "select-conditionnement-modal",
                  "settings": {
                    "label": "conditionnement",
                    "name": "select_conditionnement"
                  }
                },
                {
                  "block_type": "select",
                  "size": "1/1",
                  "settings": {
                    "label": "fréquence",
                    "displayLabel": false,
                    "name": "select_frequency",
                    "button": false,
                    "full_width": true,
                  }
                }
              ],
              "submit": [
                {
                  "block_type": "button",
                  "position": "left",
                  "settings": {
                    "label": "Remplacer le produit",
                  }
                }
              ]
            }
          ],
          "configurations": {
            "title" : {
              "show": true,
              "label": "Changer de recette"
            },
            "subtitle": {
              "show": true,
              "label": "Recette actuelle"
            },
            "description_1": {
              "show": false,
              "label": ""
            },
            "hr": {
              "show": true
            },
            "subtitle_2": {
              "show": true,
              "label": "Nouvelle recette"
            },
            "description_2": {
              "show": false,
              "label": ""
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": true,
              "label": "Nouvelle recette"
            },
            "description_3": {
              "show": false,
              "label": "Choisissez le conditionnement et la fréquence."
            },
            "link_back": {
              "show": true,
              "label": "Retour au choix du produit"
            },
            "link_details": {
              "show": true,
              "label": "Détails de la recette"
            },
            "button_label": "Choisir"
          }
        },
      ]
    },
    {
      "id": "add_product_subscribe",
      "components": [
        {
          "block_type": "add_product_subscribe",
          "block_level_options": [

          ],
          "item_level_options": [
            {
              "option": "form_change_product",
              "inputs": [
                {
                  "block_type": "select-conditionnement-modal",
                  "settings": {
                    "label": "Conditionnement",
                    "name": "select_conditionnement"
                  }
                },
                {
                  "block_type": "quantity",
                  "settings": {
                    "label": "Quantité",
                    "name": "select_quantité"
                  }
                },
                {
                  "block_type": "select",
                  "settings": {
                    "label": "Fréquence",
                    "displayLabel": false,
                    "name": "select_frequency"
                  }
                },
                {
                  "block_type": "datepicker",
                  "size": "1/1",
                  "settings": {
                    "id": "date_delivery",
                    "background": false,
                    "button": false,
                    "displayLabel": false,
                    "label": "Date de prochaine livraison",
                    "placeholder": "Date de prochaine livraison",
                    "type": "datepicker",
                    "name": "date_delivery"
                  }
                },
              ],
              "submit": [
                {
                  "block_type": "button",
                  "position": "center",
                  "settings": {
                    "label": "Ajouter le produit",
                  }
                }
              ]
            }
          ],
          "configurations": {
            "title" : {
              "show": true,
              "label": "Ajouter un nouveau produit"
            },
            "subtitle": {
              "show": false,
              "label": ""
            },
            "description_1": {
              "show": false,
              "label": "Sélectionnez le nouveau produit auquel vous souhaitez être abonné."
            },
            "hr": {
              "show": false
            },
            "subtitle_2": {
              "show": false,
              "label": ""
            },
            "description_2": {
              "show": false,
              "label": ""
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": false,
              "label": ""
            },
            "description_3": {
              "show": false,
              "label": "Paramétrez l'abonnement à ce nouveau produit."
            },
            "link_back": {
              "show": true,
              "label": "Retour au choix du produit"
            },
            "link_details": {
              "show": true,
              "label": "Détails de la recette"
            },
            "button_label": "Choisir"
          }
        },
      ]
    },
    {
      "id": "cancel_product",
      "components": [
        {
          "block_type": "cancel_product",
          "block_level_options": [

          ],
          "item_level_options": [
            {
              "option": "cancel_subscription_1",
              "inputs": [
                {
                  "block_type": "picto-text",
                  "size": "1/3",
                  "settings": {
                    "id": "picto_1",
                    "picto": "https://cdn.shopify.com/s/files/1/2598/9270/files/Sans_titre_31_400x.png?v=1592133571",
                    "title": "On vous offre 15% toute l’année",
                    "content": "Parce qu’on est content de vous voir régulièrement, on vous offre nos croquettes au meilleur prix."
                  }
                },
                {
                  "block_type": "picto-text",
                  "size": "1/3",
                  "settings": {
                    "id": "picto_2",
                    "picto": "https://cdn.shopify.com/s/files/1/2598/9270/files/Sans_titre_33_400x.png?v=1592133658",
                    "title": "On s’adapte à vos besoins",
                    "content": "Modifier à volonté les recettes, l'adresse ou encore la fréquence de livraison. C'est possible en 2 clics depuis votre compte client !"
                  }
                },
                {
                  "block_type": "picto-text",
                  "size": "1/3",
                  "settings": {
                    "id": "picto_1",
                    "picto": "https://cdn.shopify.com/s/files/1/2598/9270/files/porte-monnaie_400x.png?v=1595319911",
                    "title": "On prend soin de votre budget",
                    "content": "Pas d'argent à avancer ! Vous payez à chaque livraison en fonction de la fréquence choisie."
                  }
                }
              ],
              "submit": [
                {
                  "option": "cancel_subscription_1",
                  "block_type": "button",
                  "position": "center",
                  "settings": {
                    "label": "Continuer",
                  }
                }
              ]
            },
            {
              "option": "cancel_subscription_2",
              "inputs": [
                {
                  "block_type": "radio",
                  "size": "1/2",
                  "settings": {
                    "id": "radio_1",
                    "label": "Les produits sont trop chers",
                    "type": "radio",
                    "value": false,
                    "name": "cancellation_reason"
                  }
                },
                {
                  "block_type": "radio",
                  "size": "1/2",
                  "settings": {
                    "id": "radio_2",
                    "label": "Il y a eu des erreurs dans ma commande",
                    "type": "radio",
                    "value": false,
                    "name": "cancellation_reason"
                  }
                },
                {
                  "block_type": "radio",
                  "size": "1/2",
                  "settings": {
                    "id": "radio_3",
                    "label": "Je ne souhaitais pas m'abonner",
                    "type": "radio",
                    "value": false,
                    "name": "cancellation_reason"
                  }
                },
                {
                  "block_type": "radio",
                  "size": "1/2",
                  "settings": {
                    "id": "radio_4",
                    "label": "Mon chat ou mon chien n'aime pas",
                    "type": "radio",
                    "value": false,
                    "name": "cancellation_reason"
                  }
                },
                {
                  "block_type": "radio",
                  "size": "1/2",
                  "settings": {
                    "id": "radio_5",
                    "label": "Il y a des problèmes de livraison",
                    "type": "radio",
                    "value": false,
                    "name": "cancellation_reason"
                  }
                },
                {
                  "block_type": "radio",
                  "size": "1/2",
                  "settings": {
                    "id": "radio_6",
                    "label": "Autre raison",
                    "type": "radio",
                    "value": false,
                    "name": "cancellation_reason"
                  }
                },
              ],
              "submit": [
                {
                  "option": "close_modal",
                  "block_type": "button",
                  "position": "left",
                  "settings": {
                    "label": "Finalement je reste !",
                  }
                },
                {
                  "option": "cancel_product_submit",
                  "block_type": "button",
                  "position": "right",
                  "settings": {
                    "label": "Résilier mon abonnement",
                  }
                }
              ]
            }
          ],
          "configurations": {
            "title" : {
              "show": true,
              "label": "Nous somme désolés de vous voir partir, souhaitre-vous vraiment renoncer aux avantages de votre abonnement ?"
            },
            "subtitle": {
              "show": false,
              "label": ""
            },
            "description_1": {
              "show": false,
              "label": ""
            },
            "hr": {
              "show": false
            },
            "subtitle_2": {
              "show": false,
              "label": ""
            },
            "description_2": {
              "show": false,
              "label": ""
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": false,
              "label": ""
            },
            "description_3": {
              "show": false,
              "label": ""
            },
            "link_back": {
              "show": false,
              "label": ""
            }
          }
        },
      ]
    },
    {
      "id": "confirmation",
      "components": [
        {
          "block_type": "confirmation",
          "block_level_options": [

          ],
          "item_level_options": [
            {
              "option": "form_personals_informations",
              "inputs": [
                {
                  "block_type": "button",
                  "position": "center",
                  "settings": {
                    "label": "Non",
                    "id": "confirmation_false",
                    "name": "confirmation_false"
                  }
                },
                {
                  "block_type": "button",
                  "position": "center",
                  "settings": {
                    "label": "Oui",
                    "id": "confirmation_true",
                    "name": "confirmation_true"
                  }
                }
              ]
            }
          ],
          "configurations": {
            "title" : {
              "show": true,
              "label": "Êtes-vous sûr de vouloir arrêter votre abonnement ?"
            },
            "subtitle": {
              "show": false,
              "label": ""
            },
            "description_1": {
              "show": false,
              "label": ""
            },
            "hr": {
              "show": false
            },
            "subtitle_2": {
              "show": false,
              "label": ""
            },
            "description_2": {
              "show": false,
              "label": ""
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": false,
              "label": ""
            },
            "description_3": {
              "show": false,
              "label": ""
            },
            "link_back": {
              "show": false,
              "label": ""
            }
          }
        },
      ]
    },
    {
      "id": "display_deliveries",
      "components": [
        {
          "block_type": "display_deliveries",
          "block_level_options": [

          ],
          "item_level_options": [
          ],
          "configurations": {
            "columns": [
              {
                "label": "Transporteur"
              },
              {
                "label": "Type"
              },
              {
                "label": "Prix"
              },
              {
                "label": "Livraison offerte dès 45€ d'achat"
              }
            ],
            "title" : {
              "show": true,
              "label": "Tarifs des transporteurs"
            },
            "subtitle": {
              "show": false,
              "label": ""
            },
            "description_1": {
              "show": false,
              "label": ""
            },
            "hr": {
              "show": false
            },
            "subtitle_2": {
              "show": false,
              "label": ""
            },
            "description_2": {
              "show": false,
              "label": ""
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": false,
              "label": ""
            },
            "description_3": {
              "show": false,
              "label": ""
            },
            "link_back": {
              "show": false,
              "label": ""
            }
          }
        },
      ]
    },
    {
      "id": "quickview_product",
      "components": [
        {
          "block_type": "quickview_product",
          "block_level_options": [

          ],
          "item_level_options": [
          ],
          "configurations": {
            "title" : {
              "show": true,
              "label": "Description du produit"
            },
            "subtitle": {
              "show": false,
              "label": ""
            },
            "description_1": {
              "show": false,
              "label": ""
            },
            "hr": {
              "show": false
            },
            "subtitle_2": {
              "show": false,
              "label": ""
            },
            "description_2": {
              "show": false,
              "label": ""
            },
            "title_2" : {
              "show": false,
              "label": ""
            },
            "subtitle_3": {
              "show": false,
              "label": ""
            },
            "description_3": {
              "show": false,
              "label": ""
            },
            "link_back": {
              "show": false,
              "label": ""
            }
          }
        },
      ]
    },
  ]
}

