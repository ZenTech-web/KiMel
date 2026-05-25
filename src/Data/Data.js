import acaiCopo from "../assets/img/acairCopo.png"
import acaiTigela from "../assets/img/AcairNaTijela.png"
import acaiMorango from "../assets/img/acairComTigelaEMorango.png"
import acai700 from "../assets/img/acairNoCopo700.png"
import misto from "../assets/img/Misto.png"
import mistoQuente from "../assets/img/paoMistoQuente.png"
import hamburger from "../assets/img/x-burgue.png"
import hamburgerSupremo from "../assets/img/HaburqueSupremo.png"
import batata from "../assets/img/batataFlita.png"
import coxinha from "../assets/img/coxinha.png"
import tapiocaPlato from "../assets/img/tapiocaNoPlato.png"
import tapiocaFrango from "../assets/img/tapiocaFrango.png"
import tapiocaDoce from "../assets/img/tapiocaDoce.png"
import agua from "../assets/img/agual500ml.png"
import aguaGas from "../assets/img/aguaComGas.png"
import santaJoanaCola from "../assets/img/santaJoanaSaborCoca.png"
import santaJoanaGuarana from "../assets/img/santajonaGaranar.png"
import santaJoanaFanta from "../assets/img/sataJoanaFanta.png"
import cocaPequena from "../assets/img/cocar250ml.png"
import fantaPequena from "../assets/img/fanta250ml.png"
import coca1L from "../assets/img/cocaColar1.png"
import fanta1L from "../assets/img/fanta1L.png"
import monster from "../assets/img/moster.png"
import fandangos from "../assets/img/fandagosDePresunto.png"
import cheetos from "../assets/img/cheetos.png"
import cebolitos from "../assets/img/cebolitos21g.png"
import doritos from "../assets/img/doritos.png"
import sensacao from "../assets/img/sensacao.png"
import cuscuzImg from "../assets/img/cuscuz.png"

const Data = [
  {
    containerCategory: [
      { id: 1, icon: "🍟", name: "Batatinhas",      type: "Crocantes e deliciosas", fix: "#FFB500", fixImg: "#FFF8F0", key: "batata" },
      { id: 2, icon: "🍓", name: "Salada de Frutas", type: "Frescas todo dia",       fix: "#FF4E8C", fixImg: "#FFE5EF", key: "saladaFrutas" },
      { id: 3, icon: "🍦", name: "Sorvetes",         type: "Vários sabores",         fix: "#00C8B0", fixImg: "#E0FAF7", key: "sorvetes" },
      { id: 4, icon: "🍔", name: "Hambúrguer",       type: "Artesanais",             fix: "#FF7A3C", fixImg: "#FFE8DC", key: "hamburgueres" },
      { id: 5, icon: "🫔", name: "Cuscuz Recheado",  type: "Feito na hora",          fix: "#A855F7", fixImg: "#F3E8FF", key: "cuscuz" },
      { id: 6, icon: "🫓", name: "Tapioca",          type: "Doce ou salgada",        fix: "#3B82F6", fixImg: "#EFF6FF", key: "tapioca" },
      { id: 7, icon: "🍭", name: "Sobremesa",        type: "Para adoçar o dia",      fix: "#EC4899", fixImg: "#FDF2F8", key: "sobremesas" },
      { id: 8, icon: "🥤", name: "Bebidas",          type: "Geladas e saborosas",    fix: "#10B981", fixImg: "#ECFDF5", key: "bebidas" },
    ]
  },
  {
    products: {
      acai: [
        { id: 1,  name: "Açaí", obs: "300ml", price: 11.00, img: acaiCopo,    adicionais: ["Paçoca", "M&M", "Jujuba", "Farinha de Lactose", "Ovo de Maltine"], precoAdicional: 2.00, adicionalEspecial: { nome: "Nutella", preco: 4.00 }, frutas: ["Morango", "Banana", "Kiwi", "Maçã", "Abacaxi", "Uva"] },
        { id: 2,  name: "Açaí", obs: "400ml", price: 13.00, img: acaiTigela,  adicionais: ["Paçoca", "M&M", "Jujuba", "Farinha de Lactose", "Ovo de Maltine"], precoAdicional: 2.00, adicionalEspecial: { nome: "Nutella", preco: 4.00 }, frutas: ["Morango", "Banana", "Kiwi", "Maçã", "Abacaxi", "Uva"] },
        { id: 3,  name: "Açaí", obs: "500ml", price: 15.00, img: acaiMorango, adicionais: ["Paçoca", "M&M", "Jujuba", "Farinha de Lactose", "Ovo de Maltine"], precoAdicional: 2.00, adicionalEspecial: { nome: "Nutella", preco: 4.00 }, frutas: ["Morango", "Banana", "Kiwi", "Maçã", "Abacaxi", "Uva"] },
        { id: 4,  name: "Açaí", obs: "700ml", price: 18.00, img: acai700,     adicionais: ["Paçoca", "M&M", "Jujuba", "Farinha de Lactose", "Ovo de Maltine"], precoAdicional: 2.00, adicionalEspecial: { nome: "Nutella", preco: 4.00 }, frutas: ["Morango", "Banana", "Kiwi", "Maçã", "Abacaxi", "Uva"] },
      ],
      cachorroQuente: [
        { id: 5,  name: "Cachorro Quente", obs: "G", price: 10.00, img: null, icon: "🌭" },
        { id: 6,  name: "Cachorro Quente", obs: "P", price: 7.00,  img: null, icon: "🌭" },
      ],
      mistos: [
        { id: 7,  name: "Misto Tradicional", obs: null, price: 5.00,  img: misto },
        { id: 8,  name: "Misto com Ovo",     obs: null, price: 6.00,  img: mistoQuente },
        { id: 9,  name: "Mistão",            obs: null, price: 10.00, img: misto },
      ],
      hamburgueres: [
        { id: 10, name: "Mini Hambúrguer", obs: null, price: 10.00, img: hamburger },
        { id: 11, name: "Tradicional",     obs: null, price: 11.00, img: hamburger },
        { id: 12, name: "Burguer",         obs: null, price: 13.00, img: hamburger },
        { id: 13, name: "Big",             obs: null, price: 16.00, img: hamburger },
        { id: 14, name: "X-Calabresa",     obs: null, price: 16.00, img: hamburger },
        { id: 15, name: "W-Bacon",         obs: null, price: 17.00, img: hamburger },
        { id: 16, name: "X-Raiz",          obs: null, price: 19.00, img: hamburger },
        { id: 17, name: "Supremo",         obs: null, price: 27.00, img: hamburgerSupremo },
      ],
      batata: [
        { id: 18, name: "Batata Gourmet", obs: null, price: 18.00, img: batata },
        { id: 19, name: "Batata Frita",   obs: null, price: 10.00, img: batata },
      ],
      coxinha: [
        { id: 20, name: "Coxinha", obs: "unidade", price: 5.00, img: coxinha },
      ],
      cuscuz: [
        { id: 52, name: "Cuscuz Recheado", obs: null, price: 13.00, img: cuscuzImg },
      ],
      tapioca: [
        { id: 21, name: "Tapioca", obs: "1 Sabor",  price: 9.00,  img: tapiocaPlato,  sabores: ["Frango", "Queijo", "Presunto", "Calabresa", "Coco", "Ovos", "Leite Condensado", "Nutella", "Chocolate", "Morango"], saborEspecial: { nome: "Charque", preco: 13.00 } },
        { id: 22, name: "Tapioca", obs: "2 Sabores", price: 11.00, img: tapiocaFrango, sabores: ["Frango", "Queijo", "Presunto", "Calabresa", "Coco", "Ovos", "Leite Condensado", "Nutella", "Chocolate", "Morango"], saborEspecial: { nome: "Charque", preco: 13.00 } },
        { id: 23, name: "Tapioca", obs: "3 Sabores", price: 13.00, img: tapiocaDoce,   sabores: ["Frango", "Queijo", "Presunto", "Calabresa", "Coco", "Ovos", "Leite Condensado", "Nutella", "Chocolate", "Morango"], saborEspecial: { nome: "Charque", preco: 13.00 } },
      ],
      bebidas: [
        { id: 24, name: "Água sem Gás",       obs: null,      price: 2.00,  img: agua },
        { id: 25, name: "Água com Gás",        obs: null,      price: 4.00,  img: aguaGas },
        { id: 26, name: "Santa Joana Cola",    obs: "250ml",   price: 2.00,  img: santaJoanaCola },
        { id: 27, name: "Santa Joana Guaraná", obs: "250ml",   price: 2.00,  img: santaJoanaGuarana },
        { id: 28, name: "Santa Joana Fanta",   obs: "250ml",   price: 2.00,  img: santaJoanaFanta },
        { id: 29, name: "Coca-Cola Pequena",   obs: null,      price: 3.00,  img: cocaPequena },
        { id: 30, name: "Fanta Pequena",       obs: null,      price: 3.00,  img: fantaPequena },
        { id: 31, name: "Coca-Cola Lata",      obs: "350ml",   price: 5.00,  img: cocaPequena },
        { id: 32, name: "Fanta Laranja Lata",  obs: "350ml",   price: 5.00,  img: fantaPequena },
        { id: 33, name: "Fanta Uva Lata",      obs: "350ml",   price: 5.00,  img: null, icon: "🥤" },
        { id: 34, name: "Coca-Cola Zero Lata", obs: null,      price: 5.00,  img: null, icon: "🥤" },
        { id: 35, name: "Guaraná Lata",        obs: null,      price: 5.00,  img: null, icon: "🥤" },
        { id: 36, name: "Schweppes Lata",      obs: "350ml",   price: 5.00,  img: null, icon: "🥤" },
        { id: 37, name: "Sprite Lata",         obs: "350ml",   price: 5.00,  img: null, icon: "🥤" },
        { id: 38, name: "Mostè",               obs: "473ml",   price: 13.00, img: monster },
        { id: 39, name: "Fanta",               obs: "1 Litro", price: 8.00,  img: fanta1L },
        { id: 40, name: "Coca-Cola",           obs: "1 Litro", price: 10.00, img: coca1L },
        { id: 41, name: "Coca-Cola Zero",      obs: "1 Litro", price: 10.00, img: null, icon: "🥤" },
        { id: 42, name: "Guaraná",             obs: "1 Litro", price: 8.00,  img: null, icon: "🥤" },
      ],
      sobremesas: [
        { id: 43, name: "Musse de Limão",    obs: null, price: 5.00, img: null, icon: "🍋" },
        { id: 44, name: "Musse de Maracujá", obs: null, price: 5.00, img: null, icon: "🍹" },
        { id: 45, name: "Pudim",             obs: null, price: 5.00, img: null, icon: "🍮" },
      ],
      salgadinhos: [
        { id: 46, name: "Fandangos",  obs: "grande",  price: 3.00, img: fandangos },
        { id: 47, name: "Fandangos",  obs: "pequeno", price: 2.00, img: fandangos },
        { id: 48, name: "Cheetos",    obs: null,       price: 3.50, img: cheetos },
        { id: 49, name: "Cebolotos",  obs: null,       price: 2.00, img: cebolitos },
        { id: 50, name: "Doritos",    obs: null,       price: 5.00, img: doritos },
        { id: 51, name: "Sensação",   obs: null,       price: 7.00, img: sensacao },
      ],
    }
  }
]

export default Data
