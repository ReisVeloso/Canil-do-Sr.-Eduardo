namespace Canil.Models;

public class CanilModel
{
    public string nome;
    public float distancia;
    public float valorDiaSemanaPequeno;
    public float valorDiaSemanaGrande;
    public float valorFdsPequeno;
    public float valorFdsGrande;

    public float GetPrice(int smallDogs, int bigDogs, bool isWeekend)
    {
        if (isWeekend)
        {

            return valorFdsPequeno * smallDogs + valorFdsGrande * bigDogs; //Valor total dos banhos fds
        }
        else
        {

            return valorDiaSemanaPequeno * smallDogs + valorDiaSemanaGrande * bigDogs;//Valor total dos banhos semana
        }
    }

    public CanilModel(string nome, float distancia, float valorDiaSemanaPequeno, float valorDiaSemanaGrande, float valorFdsPequeno, float valorFdsGrande)
    {
        this.nome = nome;
        this.distancia = distancia;
        this.valorDiaSemanaPequeno = valorDiaSemanaPequeno;
        this.valorDiaSemanaGrande = valorDiaSemanaGrande;
        this.valorFdsPequeno = valorFdsPequeno;
        this.valorFdsGrande = valorFdsGrande;
    }
}

