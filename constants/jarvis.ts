export const grammars = {
  heyJarvis: `
    #JSGF V1.0 utf-8 en;
    grammar heyJarvis;

    <hey> = /10/ hey | /0.2/ Hey | /0.2/ Hi | /0.2/ hi;
    public <Jarvis> = /100/ Jarvis | /1/ Travis | /0/ Carlos | /0/ Bobby | /0/ drop it | /0/ Gabby | /0/ gummies;
    <listening> = <hey>* <Jarvis>;
  `,
  stop: `
    #JSGF V1.0 utf-8 en;
    grammar stop;

    <stop> = stop <Jarvis>*;
    <thank you> = thank you <Jarvis>*;
    `,

  focus: `
    #JSGF V1.0 utf-8 en;
    grammar focus;

    <focus> = focus <>*;
    <number> = /100/ one | /100/ two | /100/ three;
    `,
};
