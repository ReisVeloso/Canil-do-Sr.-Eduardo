using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Canil.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private Canil canil1 = new Canil("Meu Canil Feliz", 2, 20, 40, 22, 48);
        private Canil canil2 = new Canil("Vai Rex", 1.7f, 15, 50, 20, 55);
        private Canil canil3 = new Canil("Chow Chawgas", 0.8f, 30, 45, 30, 45);

        [HttpPost(Name = "getUserInput")]
        public string GetUserInput(DateTime data, int caesPequenos, int caesGrandes)
        {
            List<Canil> canis = new List<Canil> { canil1, canil2, canil3 };

            bool fimDeSemana = validarDiaDaSemana(data);
            float totalCanil1 = canil1.GetPrice(caesPequenos, caesGrandes, fimDeSemana);//Devolver o valor total do banho p/ pets P,G
            float totalCanil2 = canil2.GetPrice(caesPequenos, caesGrandes, fimDeSemana);
            float totalCanil3 = canil3.GetPrice(caesPequenos, caesGrandes, fimDeSemana);
            int melhorValorCanil = validarMelhorValor(totalCanil1, totalCanil2, totalCanil3);
            return ($"O melhor petshop é o {canis[melhorValorCanil].nome} e o valor é {canis[melhorValorCanil].GetPrice(caesPequenos, caesGrandes, fimDeSemana)}");
        }

        private bool validarDiaDaSemana(DateTime dataDoBanho)
        {
            DateTime hoje = DateTime.Today;
            if (hoje.DayOfWeek == DayOfWeek.Saturday || hoje.DayOfWeek == DayOfWeek.Sunday)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
 
        //                                         10              20               20
        private int validarMelhorValor(float totalCanil1, float totalCanil2, float totalCanil3)
        {
            if (totalCanil1 < totalCanil2 && totalCanil1 < totalCanil3)
            {
                return 0;
            }
            else if (totalCanil2 < totalCanil1 && totalCanil2 < totalCanil3)
            {
                return 1;
            }
            else if (totalCanil3 < totalCanil1 && totalCanil3 < totalCanil2)
            {
                return 2;
            }
            else
            {
                return getMenorDistancia(totalCanil1, totalCanil2, totalCanil3);
            }
        }

        private int getMenorDistancia(float totalCanil1, float totalCanil2, float totalCanil3)
        {
            if (totalCanil1 == totalCanil2) 
            { 
                return canil1.distancia < canil2.distancia ? 0 : 1; 
            }
            else if (totalCanil1 == totalCanil3) 
            {
                return canil1.distancia < canil3.distancia ? 0 : 2; 
            }
            else 
            { 
                return canil2.distancia < canil3.distancia ? 1 : 2; 
            }
        }

    }
}
